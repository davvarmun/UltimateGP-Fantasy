package com.davvarmun.ultimategp.ultimategp.auth.payload.request;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String email;

}
