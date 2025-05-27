package com.davvarmun.ultimategp.ultimategp.rider;

import com.davvarmun.ultimategp.ultimategp.rider.RiderClassification;
import com.davvarmun.ultimategp.ultimategp.rider.RiderClassificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clasificacion")
public class ClassificationController {

    @Autowired
    private RiderClassificationRepository repo;

    @GetMapping
    public List<RiderClassification> getAll() {
        return repo.findAll();
    }
}
