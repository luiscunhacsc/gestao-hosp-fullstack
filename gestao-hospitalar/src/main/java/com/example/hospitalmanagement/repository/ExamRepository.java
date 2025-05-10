package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
