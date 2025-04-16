package com.davvarmun.ultimategp.ultimategp.rider;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.davvarmun.ultimategp.ultimategp.exceptions.ResourceNotFoundException;
import com.davvarmun.ultimategp.ultimategp.rider.dto.RiderDTO;
import com.davvarmun.ultimategp.ultimategp.team.TeamRepository;

@Service
public class RiderService {

    private final RiderRepository riderRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public RiderService(RiderRepository riderRepository, TeamRepository teamRepository) {
        this.riderRepository = riderRepository;
        this.teamRepository = teamRepository;
    }

    @Transactional(readOnly = true)
    public List<Rider> getAllRiders() {
        return riderRepository.getAll();
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

        return riderRepository.save(rider);
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

        return riderRepository.save(existingRider);
    }

    @Transactional
    public void deleteRider(int id) {
        Rider rider = riderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rider", "id", id));
        riderRepository.deleteById(id);
    }
}
