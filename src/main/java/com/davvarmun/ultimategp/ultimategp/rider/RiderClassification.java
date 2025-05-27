package com.davvarmun.ultimategp.ultimategp.rider;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Map;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Column;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.davvarmun.ultimategp.ultimategp.result.Result;
import com.davvarmun.ultimategp.ultimategp.team.Team;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "classification_table")
@Entity
public class RiderClassification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int posicion;
    private String piloto;
    private String pais;
    private String moto;
    private int puntos;

    @ElementCollection
    @CollectionTable(name = "resultados_por_gp", joinColumns = @JoinColumn(name = "piloto_id"))
    @MapKeyColumn(name = "circuito")
    @Column(name = "resultado")
    private Map<String, String> resultados;

    // Getters y Setters
}
