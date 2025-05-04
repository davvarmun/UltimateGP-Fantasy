package com.davvarmun.ultimategp.ultimategp.rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
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

    @GetMapping("/scrape")
    public ResponseEntity<?> scrapeRiders() {
        try {
            // Invocar el script de Puppeteer usando Node.js
            ProcessBuilder processBuilder = new ProcessBuilder("node", "scraper/scrapeRiders.js");
            Process process = processBuilder.start();

            // Leer la salida del proceso
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            // Esperar a que el proceso termine
            process.waitFor();

            // Convertir la salida en un objeto JSON
            String jsonOutput = output.toString();

            return ResponseEntity.ok(jsonOutput);
        } catch (Exception e) {
            logger.error("Error al ejecutar el script de scraping", e);
            return ResponseEntity.status(500).body("Error al realizar scraping");
        }
    }
}
