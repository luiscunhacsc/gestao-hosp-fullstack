package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.model.Hospitalization;
import com.example.hospitalmanagement.service.HospitalizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitalizations")
public class HospitalizationController {
    private final HospitalizationService hospitalizationService;

    public HospitalizationController(HospitalizationService hospitalizationService) {
        this.hospitalizationService = hospitalizationService;
    }

    @GetMapping
    public List<Hospitalization> getAllHospitalizations() {
        return hospitalizationService.getAllHospitalizations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospitalization> getHospitalizationById(@PathVariable Long id) {
        return hospitalizationService.getHospitalizationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Hospitalization createHospitalization(@RequestBody Hospitalization hospitalization) {
        return hospitalizationService.createHospitalization(hospitalization);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospitalization> updateHospitalization(@PathVariable Long id, @RequestBody Hospitalization hospitalization) {
        if (!hospitalizationService.getHospitalizationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(hospitalizationService.updateHospitalization(id, hospitalization));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospitalization(@PathVariable Long id) {
        if (!hospitalizationService.getHospitalizationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        hospitalizationService.deleteHospitalization(id);
        return ResponseEntity.noContent().build();
    }
}
