package com.davvarmun.ultimategp.ultimategp.result;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.davvarmun.ultimategp.ultimategp.rider.Rider;
import com.davvarmun.ultimategp.ultimategp.race.Race;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIdentityInfo(scope = Result.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@Table(name = "result_table")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Min(1)
    @Max(22) // MotoGP suele tener un máximo de 22 pilotos
    private Integer position;

    @NotNull
    @Min(0)
    @Max(25) // Máximo de puntos por carrera en MotoGP
    private Integer points;

    @ManyToOne
    @JoinColumn(name = "rider_id")
    private Rider rider;

    @ManyToOne
    @JoinColumn(name = "race_id")
    private Race race;
}
