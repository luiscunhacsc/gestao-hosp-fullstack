package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Exam;
import com.example.hospitalmanagement.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {
    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Long id, Exam updatedExam) {
        updatedExam.setId(id);
        return examRepository.save(updatedExam);
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}
