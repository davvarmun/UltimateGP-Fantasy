package com.davvarmun.ultimategp.ultimategp.team;

import com.davvarmun.ultimategp.ultimategp.exceptions.ResourceNotFoundException;
import com.davvarmun.ultimategp.ultimategp.team.dto.TeamDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    // Obtener todos los equipos (para usuarios y admins)
    @Transactional
    public List<Team> getAllTeams() {
        return teamRepository.getAllTeams();
    }

    // Obtener un equipo por ID
    @Transactional
    public Team getTeamById(Integer id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", id));
    }

    // Crear un nuevo equipo (solo admin)
    @Transactional
    public Team createTeam(TeamDTO teamDTO) {
        Team team = new Team();
        team.setName(teamDTO.getName());
        team.setConstructor(teamDTO.getConstructor());
        team.setPoints(teamDTO.getPoints() != null ? teamDTO.getPoints() : 0);
        return teamRepository.save(team);
    }

    // Actualizar un equipo (solo admin)
    @Transactional
    public Team updateTeam(Integer id, TeamDTO teamDTO) {
        Team existing = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", id));

        existing.setName(teamDTO.getName());
        existing.setConstructor(teamDTO.getConstructor());
        existing.setPoints(teamDTO.getPoints());

        return teamRepository.save(existing);
    }

    // Eliminar un equipo (solo admin)
    @Transactional
    public void deleteTeam(Integer id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", id));

        teamRepository.delete(team);
    }
}
