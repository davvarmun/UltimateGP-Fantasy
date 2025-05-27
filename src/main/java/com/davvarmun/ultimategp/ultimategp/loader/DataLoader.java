package com.davvarmun.ultimategp.ultimategp.loader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.davvarmun.ultimategp.ultimategp.rider.RiderClassification;
import com.davvarmun.ultimategp.ultimategp.rider.RiderClassificationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RiderClassificationRepository repo;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<RiderClassification>> typeRef = new TypeReference<>() {};
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("classification_motogp2007.json");

        if (inputStream != null) {
            List<RiderClassification> pilotos = mapper.readValue(inputStream, typeRef);
            repo.saveAll(pilotos);
            System.out.println("✅ Clasificación 2007 importada correctamente.");
        } else {
            System.err.println("❌ No se encontró el archivo JSON.");
        }
    }
}
