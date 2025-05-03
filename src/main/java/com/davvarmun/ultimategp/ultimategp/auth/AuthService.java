package com.davvarmun.ultimategp.ultimategp.auth;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import com.davvarmun.ultimategp.ultimategp.user.UserService;
import com.davvarmun.ultimategp.ultimategp.user.User;
import com.davvarmun.ultimategp.ultimategp.auth.payload.request.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.davvarmun.ultimategp.ultimategp.user.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthoritiesService authoritiesService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, AuthoritiesService authoritiesService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authoritiesService = authoritiesService;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(SignupRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // 🔐 ENCRIPTAR AQUÍ
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());

        // Asignar rol por defecto
        Authorities defaultRole = authoritiesService.findByAuthority("ROLE_USER");
        user.setAuthorities(defaultRole);

        userRepository.save(user);
    }
}

