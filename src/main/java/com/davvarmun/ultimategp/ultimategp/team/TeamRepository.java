package com.davvarmun.ultimategp.ultimategp.team;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends CrudRepository<Team, Integer> {

    // 👇 JOIN FETCH para traer también los riders asociados
    @Query("SELECT DISTINCT t FROM Team t LEFT JOIN FETCH t.riders")
    List<Team> getAllTeams();
}
