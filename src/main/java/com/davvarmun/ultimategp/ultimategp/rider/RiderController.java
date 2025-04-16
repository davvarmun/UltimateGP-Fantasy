package com.davvarmun.ultimategp.ultimategp.rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Riders (User)", description = "Consulta de pilotos para usuarios fantasy")
@RestController
@RequestMapping("/api/v1/riders")
public class RiderController {

    private final RiderService riderService;

    @Autowired
    public RiderController(RiderService riderService) {
        this.riderService = riderService;
    }

    @GetMapping
    public ResponseEntity<List<Rider>> getAllRiders() {
        List<Rider> riders = riderService.getAllRiders();
        if (riders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(riders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rider> getRiderById(@PathVariable Integer id) {
        Rider rider = riderService.findById(id);
        return ResponseEntity.ok(rider);
    }
}
