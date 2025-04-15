package com.davvarmun.ultimategp.ultimategp.team;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.davvarmun.ultimategp.ultimategp.rider.Rider;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(scope = Team.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Getter
@Setter
@Table(name = "team_table")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 2, max = 100)
    private String constructor;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Rider> riders = new ArrayList<>();

    private Integer points;

}
