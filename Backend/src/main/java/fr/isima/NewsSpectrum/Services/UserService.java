package fr.isima.NewsSpectrum.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import fr.isima.NewsSpectrum.DTO.userDTO.*;
import fr.isima.NewsSpectrum.Config.SecurityConfiguration.*;
import fr.isima.NewsSpectrum.Models.User;
import fr.isima.NewsSpectrum.Repositories.UserRepository;

@Service
public class UserService {
    
    public final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public User updateUser(User currentUser, UpdateUserDTO dto) {
        // Vérifier le mot de passe actuel
        if (!passwordEncoder.matches(dto.currentPassword(), currentUser.getPassword())) {
            throw new SecurityException("Mot de passe actuel incorrect");
        }
    
        // Vérifier la confirmation du nouveau mot de passe
        if (dto.newPassword() != null && !dto.newPassword().equals(dto.confirmNewPassword())) {
            throw new IllegalArgumentException("Les nouveaux mots de passe ne correspondent pas");
        }
    
        // Mettre à jour les champs
        if (dto.username() != null && !dto.username().isBlank()) {
            if (userRepository.existsByUsername(dto.username()) && !currentUser.getUsername().equals(dto.username())) {
                throw new IllegalArgumentException("Nom d'utilisateur déjà pris");
            }
            currentUser.setUsername(dto.username());
        }
    
        if (dto.email() != null && !dto.email().isBlank()) {
            if (userRepository.existsByEmail(dto.email()) && !currentUser.getEmail().equals(dto.email())) {
                throw new IllegalArgumentException("Email déjà utilisé");
            }
            currentUser.setEmail(dto.email());
        }
    
        if (dto.newPassword() != null && !dto.newPassword().isBlank()) {
            currentUser.setPassword(passwordEncoder.encode(dto.newPassword()));
        }
    
        return userRepository.save(currentUser);
    }
    
    public void deleteUser(User user, DeleteUserDTO dto) {
        if (!passwordEncoder.matches(dto.password(), user.getPassword())) {
            throw new SecurityException("Mot de passe incorrect");
        }
        userRepository.delete(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Ce username est déjà utilisé !");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Cet email est déjà utilisé !");
        }

        User newUser = new User(username, email, passwordEncoder.encode(password));
        return userRepository.save(newUser);
    }

    public User getUser(String nameOrEmail, String password) {
        // Utilise l'instance userRepository au lieu de la classe UserRepository
        User user = userRepository.findByUsername(nameOrEmail).orElse(null);
        if (user == null) {
            user = userRepository.findByEmail(nameOrEmail).orElse(null);
        }
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null; // Retourne null si non trouvé ou mot de passe incorrect
    }

    public User updateUser(Long id, String newName, String newEmail, String newPassword) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé !");
        }
        User user = optionalUser.get();
        if (userRepository.existsByUsername(newName) && !user.getUsername().equals(newName)) {
            throw new RuntimeException("Ce nom est déjà pris !");
        }
        if (userRepository.existsByEmail(newEmail) && !user.getEmail().equals(newEmail)) {
            throw new RuntimeException("Cet email est déjà pris !");
        }

        user.setUsername(newName);
        user.setEmail(newEmail);
        user.setPassword(newPassword);

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // public User getAuthenticatedUser() {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
    //     if (authentication != null && authentication.isAuthenticated()) {
    //         return (User) authentication.getPrincipal();
    //     }
        
    //     throw new IllegalArgumentException("User is not authenticated");
    // }
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof String) {
                // When principal is a String, treat it as username/email
                String username = (String) principal;
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
            } else if (principal instanceof User) {
                return (User) principal;
            } else {
                throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
            }
        }
        throw new IllegalStateException("User not authenticated");
    }

}