package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.model.Hospitalization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalizationRepository extends JpaRepository<Hospitalization, Long> {
}
