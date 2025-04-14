package com.davvarmun.ultimategp.ultimategp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().configurationSource(corsConfigurationSource())  // Agregar esta línea para aplicar CORS
            .exceptionHandling()
            .authenticationEntryPoint(unauthorizedHandler)
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .authorizeRequests()
            .requestMatchers("/api/v1/auth/**").permitAll()  // Acceso sin autenticación para el signin
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    // Método para la configuración de CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:8081", "http://127.0.0.1:8081"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

