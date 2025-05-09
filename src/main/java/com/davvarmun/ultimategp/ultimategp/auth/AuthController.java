package com.davvarmun.ultimategp.ultimategp.auth;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.davvarmun.ultimategp.ultimategp.user.UserService;
import com.davvarmun.ultimategp.ultimategp.user.User;
import com.davvarmun.ultimategp.ultimategp.auth.jwt.JwtUtils;
import com.davvarmun.ultimategp.ultimategp.auth.payload.request.LoginRequest;
import com.davvarmun.ultimategp.ultimategp.auth.payload.request.SignupRequest;
import com.davvarmun.ultimategp.ultimategp.auth.payload.response.MessageResponse;
import com.davvarmun.ultimategp.ultimategp.auth.jwt.JwtResponse;
import com.davvarmun.ultimategp.ultimategp.config.services.UserDetailsImpl;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

import org.springframework.security.authentication.BadCredentialsException;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonFactory;
import java.util.Collections;
import com.google.api.client.json.jackson2.JacksonFactory;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final AuthService authService;
    
    @Autowired
    private AuthoritiesService authoritiesService;


    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils,
            AuthService authService) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<Object> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok()
                    .body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
        } catch (BadCredentialsException exception) {
            return ResponseEntity.badRequest().body(new MessageResponse("Bad Credentials!"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Object> authSantos(@RequestHeader HttpHeaders headers) {
        try {
            if (!headers.containsKey("Authorization")) {
                throw new BadCredentialsException("");
            }
            String token = headers.get("Authorization").get(0).substring(6);
            Boolean isValid = jwtUtils.validateJwtToken(token);
            if (!isValid) {
                throw new BadCredentialsException("");
            }
            String username = jwtUtils.getUserNameFromJwtToken(token);
            User loggedInUser = userService.findByUsername(username);
            if (loggedInUser == null) {
                throw new BadCredentialsException("");
            }
            return ResponseEntity.ok().body(loggedInUser);
        } catch (BadCredentialsException exception) {
            return ResponseEntity.badRequest().body(new MessageResponse("Bad Credentials!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Something went wrong"));
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
        Boolean isValid = jwtUtils.validateJwtToken(token);
        return ResponseEntity.ok(isValid);
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.findByUsername(signUpRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        authService.createUser(signUpRequest);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
    }

    @PostMapping("/google-signin")
    public ResponseEntity<Object> authenticateWithGoogle(@RequestBody Map<String, String> payload) {
        try {
            String idTokenString = payload.get("id_token");

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
                    .Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList("74295351194-crl719vhp3sept2jau18c6b0ad61f1jr.apps.googleusercontent.com"))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                return ResponseEntity.badRequest().body(new MessageResponse("Invalid Google ID Token"));
            }

            GoogleIdToken.Payload googlePayload = idToken.getPayload();
            String email = googlePayload.getEmail();
            String name = (String) googlePayload.get("given_name");
            String surname = (String) googlePayload.get("family_name");

            User user = userService.findByEmail(email);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setUsername(email); 
                user.setName(name);
                user.setSurname(surname);
                user.setPassword("GOOGLE_LOGIN"); 
                Authorities role = authoritiesService.findByAuthority("ROLE_USER");
                user.setAuthorities(role);
                userService.save(user);
            }

            String jwt = jwtUtils.generateTokenFromUsername(user.getUsername(), user.getAuthorities());

            return ResponseEntity.ok().body(new JwtResponse(jwt, user.getId(), user.getUsername(), List.of(user.getAuthorities().getAuthority())));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Google authentication failed"));
        }
    }


}
