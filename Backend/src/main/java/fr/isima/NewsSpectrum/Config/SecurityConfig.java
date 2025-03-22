// package fr.isima.NewsSpectrum.Config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// 

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors().configurationSource(corsConfigurationSource()).and()
//             .csrf().disable() // Désactive CSRF pour les API REST
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/auth/**").permitAll() // Autorise les endpoints d'authentification
//                 .anyRequest().authenticated()
//             );
//         return http.build();
//     }

//     @Bean
//     CorsConfigurationSource corsConfigurationSource() {
        
//     }
// }