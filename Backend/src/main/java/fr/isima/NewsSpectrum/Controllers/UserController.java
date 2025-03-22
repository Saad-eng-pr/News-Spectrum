package fr.isima.NewsSpectrum.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.isima.NewsSpectrum.DTO.userDTO.*;
import fr.isima.NewsSpectrum.DTO.userDTO.DeleteUserDTO;
import fr.isima.NewsSpectrum.DTO.userDTO.UpdateUserDTO;
import fr.isima.NewsSpectrum.Models.User;
import fr.isima.NewsSpectrum.Services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService UserService;

    public UserController(UserService UserService) {
        this.UserService = UserService;
    }

    @GetMapping
    public String hello() {
        return "Hello";
    }

    //Post crete user
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User userCreated = UserService.createUser(user.getUsername(), user.getEmail(), user.getPassword());
        return ResponseEntity.status(201).body(userCreated);
    }

    //Get all users
    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = UserService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //Get user login
    @GetMapping("/login")
    public ResponseEntity<User> getUser(@RequestParam String name, @RequestParam String password) {
        return UserService.getUser(name, password) != null
                ? ResponseEntity.ok(UserService.getUser(name, password))
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserDTO dto) {
        User currentUser = UserService.getAuthenticatedUser();
        try {
            User updatedUser = UserService.updateUser(currentUser, dto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@Valid @RequestBody DeleteUserDTO dto) {
        User currentUser = UserService.getAuthenticatedUser();
        try {
            UserService.deleteUser(currentUser, dto);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        User currentUser = UserService.getAuthenticatedUser();

        return ResponseEntity.ok(currentUser);
    }


    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = UserService.getAllUsers();

        return ResponseEntity.ok(users);
    }
}
