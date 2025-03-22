package fr.isima.NewsSpectrum.DTO;

import jakarta.validation.constraints.NotBlank;


public class userDTO {
    private Long userID;
    private String userName;
    private String email;

    userDTO() {}

    userDTO(Long userID, String userName, String email) {
        this.userID = userID;
        this.userName = userName;
        this.email = email;
    }
    public record UpdateUserDTO(
    @NotBlank String currentPassword,
    String newPassword,
    String confirmNewPassword,
    String username,
    String email
) {}

    // DeleteUserDTO.java
    public record DeleteUserDTO(
        @NotBlank String password
    ) {}

    public Long getUserId() {
        return userID;
    }
    public void setUserId(Long userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
