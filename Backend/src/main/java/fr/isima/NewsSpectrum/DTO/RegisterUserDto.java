package fr.isima.NewsSpectrum.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterUserDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(min=8, max=32)
    private String password; 
    
    private String Username;
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getUsername() {
        return Username;
    }
    
    public void setUsername(String Username) {
        this.Username = Username;
    }
}
