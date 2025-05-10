package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Hospitalization;
import com.example.hospitalmanagement.repository.HospitalizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalizationService {
    private final HospitalizationRepository hospitalizationRepository;

    public HospitalizationService(HospitalizationRepository hospitalizationRepository) {
        this.hospitalizationRepository = hospitalizationRepository;
    }

    public List<Hospitalization> getAllHospitalizations() {
        return hospitalizationRepository.findAll();
    }

    public Optional<Hospitalization> getHospitalizationById(Long id) {
        return hospitalizationRepository.findById(id);
    }

    public Hospitalization createHospitalization(Hospitalization hospitalization) {
        return hospitalizationRepository.save(hospitalization);
    }

    public Hospitalization updateHospitalization(Long id, Hospitalization updatedHospitalization) {
        updatedHospitalization.setId(id);
        return hospitalizationRepository.save(updatedHospitalization);
    }

    public void deleteHospitalization(Long id) {
        hospitalizationRepository.deleteById(id);
    }
}
