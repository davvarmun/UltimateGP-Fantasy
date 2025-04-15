package com.davvarmun.ultimategp.ultimategp.rider;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.davvarmun.ultimategp.ultimategp.team.Team;
import com.davvarmun.ultimategp.ultimategp.result.Result;
import com.davvarmun.ultimategp.ultimategp.rider.Country;

import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIdentityInfo(scope = Rider.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@Table(name = "rider_table")
public class Rider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    private String surname;

    private Integer points;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Country nationality;

    @NotNull
    private Integer bikeNumber;

    @OneToMany(mappedBy = "rider", cascade = CascadeType.ALL)
    private List<Result> raceResults = new ArrayList<>();

    @ManyToOne
    private Team team;
}
