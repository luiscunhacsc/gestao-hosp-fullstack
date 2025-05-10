package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Patient;
import com.example.hospitalmanagement.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        updatedPatient.setId(id);
        return patientRepository.save(updatedPatient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
