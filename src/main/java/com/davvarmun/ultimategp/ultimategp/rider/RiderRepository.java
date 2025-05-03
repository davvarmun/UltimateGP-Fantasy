package com.davvarmun.ultimategp.ultimategp.rider;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiderRepository extends CrudRepository<Rider, Integer> {

    // Usamos @EntityGraph para cargar la relación `Team` con los Riders
    @EntityGraph(attributePaths = {"team"})
    @Query("SELECT r FROM Rider r")
    List<Rider> getAll();

}
