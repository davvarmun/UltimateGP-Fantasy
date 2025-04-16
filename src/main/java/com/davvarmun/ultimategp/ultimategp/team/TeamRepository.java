package com.davvarmun.ultimategp.ultimategp.team;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends CrudRepository<Team, Integer> {

    @Query("SELECT t FROM Team t")
    List<Team> getAllTeams();

}
