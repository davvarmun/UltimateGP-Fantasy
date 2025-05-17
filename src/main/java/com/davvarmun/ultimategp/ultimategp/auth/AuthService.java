package com.davvarmun.ultimategp.ultimategp.auth;

import com.davvarmun.ultimategp.ultimategp.user.User;
import com.davvarmun.ultimategp.ultimategp.auth.payload.request.SignupRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.davvarmun.ultimategp.ultimategp.auth.jwt.JwtService;
import com.davvarmun.ultimategp.ultimategp.user.UserRepository;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport; // Aquí usamos GoogleNetHttpTransport en lugar de NetHttpTransport
import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthoritiesService authoritiesService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public AuthService(UserRepository userRepository, AuthoritiesService authoritiesService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.authoritiesService = authoritiesService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public void createUser(SignupRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());

        Authorities defaultRole = authoritiesService.findByAuthority("ROLE_USER");
        user.setAuthorities(defaultRole);

        userRepository.save(user);
    }

    public AuthResponse authenticateWithGoogle(String idTokenString) throws Exception {
        System.out.println("ID token received: " + idTokenString);
        JsonFactory jsonFactory = new JacksonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(GoogleNetHttpTransport.newTrustedTransport(), jsonFactory) // Modificado aquí
                .setAudience(Collections.singletonList("74295351194-crl719vhp3sept2jau18c6b0ad61f1jr.apps.googleusercontent.com"))
                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);

        if (idToken == null) {
            throw new IllegalArgumentException("Invalid ID token.");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(email);
            newUser.setEmail(email);
            newUser.setName((String) payload.get("given_name"));
            newUser.setSurname((String) payload.get("family_name"));
            newUser.setPassword(""); // No se utiliza la contraseña con Google
            newUser.setAuthorities(authoritiesService.findByAuthority("ROLE_USER"));
            return userRepository.save(newUser);
        });

        String token = jwtService.generateToken(user);  // Usamos el servicio JWT para generar el token
        return new AuthResponse(token, user.getUsername());  // Regresamos el token generado y el nombre de usuario
    }
}
