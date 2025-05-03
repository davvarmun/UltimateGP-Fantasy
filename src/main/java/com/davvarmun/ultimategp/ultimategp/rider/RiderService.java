package com.davvarmun.ultimategp.ultimategp.rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.davvarmun.ultimategp.ultimategp.exceptions.ResourceNotFoundException;
import com.davvarmun.ultimategp.ultimategp.rider.dto.RiderDTO;
import com.davvarmun.ultimategp.ultimategp.team.TeamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RiderService {

    private final RiderRepository riderRepository;
    private final TeamRepository teamRepository;
    private static final Logger logger = LoggerFactory.getLogger(RiderService.class);

    @Autowired
    public RiderService(RiderRepository riderRepository, TeamRepository teamRepository) {
        this.riderRepository = riderRepository;
        this.teamRepository = teamRepository;
    }

    @Transactional(readOnly = true)
    public List<Rider> getAllRiders() {
        List<Rider> riders = riderRepository.getAll();
        
        // Log para verificar los datos obtenidos
        if (riders.isEmpty()) {
            logger.warn("No se encontraron riders en la base de datos.");
        } else {
            logger.info("Se han encontrado " + riders.size() + " riders.");
        }
        
        return riders;
    }

    @Transactional(readOnly = true)
    public Rider findById(int id) {
        return riderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rider", "id", id));
    }

    @Transactional
    public Rider createRider(RiderDTO riderDTO) {
        Rider rider = new Rider();
        rider.setName(riderDTO.getName());
        rider.setSurname(riderDTO.getSurname());
        rider.setPoints(riderDTO.getPoints());
        rider.setNationality(riderDTO.getNationality());
        rider.setBikeNumber(riderDTO.getBikeNumber());

        if (riderDTO.getTeamId() != null) {
            rider.setTeam(teamRepository.findById(riderDTO.getTeamId())
                    .orElseThrow(() -> new ResourceNotFoundException("Team", "id", riderDTO.getTeamId())));
        }

        Rider savedRider = riderRepository.save(rider);

        // Log para ver si la creación fue exitosa
        logger.info("Rider creado: " + savedRider.getName() + " " + savedRider.getSurname());
        
        return savedRider;
    }

    @Transactional
    public Rider updateRider(int id, RiderDTO updatedRider) {
        Rider existingRider = riderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rider", "id", id));

        existingRider.setName(updatedRider.getName());
        existingRider.setSurname(updatedRider.getSurname());
        existingRider.setPoints(updatedRider.getPoints());
        existingRider.setNationality(updatedRider.getNationality());
        existingRider.setBikeNumber(updatedRider.getBikeNumber());

        if (updatedRider.getTeamId() != null) {
            existingRider.setTeam(teamRepository.findById(updatedRider.getTeamId())
                    .orElseThrow(() -> new ResourceNotFoundException("Team", "id", updatedRider.getTeamId())));
        }

        Rider updated = riderRepository.save(existingRider);

        // Log para ver si la actualización fue exitosa
        logger.info("Rider actualizado: " + updated.getName() + " " + updated.getSurname());
        
        return updated;
    }

    @Transactional
    public void deleteRider(int id) {
        Rider rider = riderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rider", "id", id));
        
        riderRepository.deleteById(id);

        // Log para confirmar la eliminación
        logger.info("Rider eliminado con id: " + id);
    }
}
