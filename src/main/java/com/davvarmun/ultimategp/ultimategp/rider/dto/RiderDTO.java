package com.davvarmun.ultimategp.ultimategp.rider.dto;

import com.davvarmun.ultimategp.ultimategp.rider.Country;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RiderDTO {

    private Integer id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    private String surname;

    @NotNull
    private Integer points;

    @NotNull
    private Country nationality;

    @NotNull
    private Integer bikeNumber;

    private Integer teamId; // para establecer la relación con el equipo
}
