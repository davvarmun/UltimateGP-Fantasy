package com.davvarmun.ultimategp.ultimategp.team;

import com.davvarmun.ultimategp.ultimategp.team.dto.TeamDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Team", description = "Gestión de equipos (usuarios)")
@RestController
@RequestMapping("/api/v1/team")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @Operation(summary = "Obtener todos los equipos", description = "Lista completa de equipos disponibles")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Equipos encontrados"),
        @ApiResponse(responseCode = "204", description = "No hay equipos registrados")
    })
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

    @Operation(summary = "Obtener equipo por ID", description = "Devuelve los datos del equipo seleccionado")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Equipo encontrado"),
        @ApiResponse(responseCode = "404", description = "Equipo no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable Integer id) {
        TeamDTO team = new TeamDTO(teamService.getTeamById(id));
        return ResponseEntity.ok(team);
    }
}
