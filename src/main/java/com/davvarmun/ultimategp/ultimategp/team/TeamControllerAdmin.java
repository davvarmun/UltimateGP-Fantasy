package com.davvarmun.ultimategp.ultimategp.team;

import com.davvarmun.ultimategp.ultimategp.team.dto.TeamDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Team (Admin)", description = "Gestión de equipos para administradores")
@RestController
@RequestMapping("/api/v1/admin/team")
public class TeamControllerAdmin {

    private final TeamService teamService;

    @Autowired
    public TeamControllerAdmin(TeamService teamService) {
        this.teamService = teamService;
    }

    @Operation(summary = "Crear un nuevo equipo", description = "Solo accesible por administradores")
    @PostMapping
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Equipo creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    public ResponseEntity<TeamDTO> createTeam(@RequestBody @Valid TeamDTO teamDTO) {
        TeamDTO created = new TeamDTO(teamService.createTeam(teamDTO));
        return ResponseEntity.status(201).body(created);
    }

    @Operation(summary = "Actualizar un equipo", description = "Modificar información de un equipo existente")
    @PutMapping("/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Equipo actualizado"),
        @ApiResponse(responseCode = "404", description = "Equipo no encontrado")
    })
    public ResponseEntity<TeamDTO> updateTeam(@PathVariable Integer id, @RequestBody @Valid TeamDTO teamDTO) {
        TeamDTO updated = new TeamDTO(teamService.updateTeam(id, teamDTO));
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Eliminar un equipo", description = "Elimina un equipo por su ID")
    @DeleteMapping("/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Equipo eliminado"),
        @ApiResponse(responseCode = "404", description = "Equipo no encontrado")
    })
    public ResponseEntity<Void> deleteTeam(@PathVariable Integer id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Obtener todos los equipos", description = "Lista de todos los equipos (incluyendo administrativos)")
    @GetMapping
    public ResponseEntity<List<TeamDTO>> getAllTeams() {
        List<TeamDTO> teams = teamService.getAllTeams()
                .stream()
                .map(TeamDTO::new)
                .collect(Collectors.toList());

        if (teams.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(teams);
    }
}
