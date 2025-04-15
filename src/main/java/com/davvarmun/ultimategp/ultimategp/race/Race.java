package com.davvarmun.ultimategp.ultimategp.race;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.davvarmun.ultimategp.ultimategp.result.Result;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(scope = Race.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@Table(name = "race_table")
public class Race {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String name;

    @NotBlank
    private String circuit; 

    @NotBlank
    private String country;

    @NotNull
    @FutureOrPresent
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private LocalDate date;

    @OneToMany(mappedBy = "race", cascade = CascadeType.ALL)
    private List<Result> results = new ArrayList<>();
}

