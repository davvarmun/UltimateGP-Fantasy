package com.davvarmun.ultimategp.ultimategp.auth.dto;

import com.davvarmun.ultimategp.ultimategp.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDTO {

    private Integer id;

    private String name;

    private String surname;

    private String username;

    private String email;

    private byte[] profilePhoto;

    public AuthDTO() {

    }

    public AuthDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profilePhoto = user.getProfilePhoto();
    }
}
