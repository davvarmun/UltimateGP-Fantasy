package com.davvarmun.ultimategp.ultimategp.rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Tag(name = "Riders (User)", description = "Consulta de pilotos para usuarios fantasy")
@RestController
@RequestMapping("/api/v1/riders")
public class RiderController {

    private final RiderService riderService;
    private static final Logger logger = LoggerFactory.getLogger(RiderController.class);

    @Autowired
    public RiderController(RiderService riderService) {
        this.riderService = riderService;
    }

    @GetMapping
    public ResponseEntity<List<Rider>> getAllRiders() {
        List<Rider> riders = riderService.getAllRiders();
        
        // Log para ver la cantidad de riders obtenidos
        if (riders.isEmpty()) {
            logger.warn("No se encontraron riders.");
            return ResponseEntity.noContent().build();
        }
        
        logger.info("Riders encontrados: " + riders.size());
        for (Rider rider : riders) {
            logger.info("Rider: " + rider.getName() + " " + rider.getSurname() + " - Equipo: " + (rider.getTeam() != null ? rider.getTeam().getName() : "Sin equipo"));
        }
        
        return ResponseEntity.ok(riders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rider> getRiderById(@PathVariable Integer id) {
        Rider rider = riderService.findById(id);
        
        // Log para verificar si se recupera correctamente el rider por ID
        logger.info("Rider encontrado: " + rider.getName() + " " + rider.getSurname());
        return ResponseEntity.ok(rider);
    }
}
