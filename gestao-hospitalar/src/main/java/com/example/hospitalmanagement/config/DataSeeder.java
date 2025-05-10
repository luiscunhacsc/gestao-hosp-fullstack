package com.example.hospitalmanagement.config;

import com.example.hospitalmanagement.model.Doctor;
import com.example.hospitalmanagement.model.Patient;
import com.example.hospitalmanagement.model.Gender;
import com.example.hospitalmanagement.model.SpecialtyType;
import com.example.hospitalmanagement.repository.DoctorRepository;
import com.example.hospitalmanagement.repository.PatientRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Locale;
import java.util.Random;

@Component
@Profile("default") // Only runs in default profile (dev)
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    private final Faker faker = new Faker(new Locale("en"));
    private final Random random = new Random();

    @Override
    public void run(String... args) {
        if (patientRepository.count() == 0) {
            for (int i = 0; i < 200; i++) {
                Patient patient = Patient.builder()
                        .name(faker.name().fullName())
                        .birthDate(LocalDate.now().minusYears(18 + random.nextInt(60)).minusDays(random.nextInt(365)))
                        .gender(Gender.values()[random.nextInt(Gender.values().length)])
                        .phone(faker.phoneNumber().cellPhone())
                        .email(faker.internet().emailAddress())
                        .nif(faker.number().digits(9))
                        .address(faker.address().fullAddress())
                        .healthNumber(faker.number().digits(12))
                        .build();
                patientRepository.save(patient);
            }
        }
        if (doctorRepository.count() == 0) {
            for (int i = 0; i < 200; i++) {
                Doctor doctor = Doctor.builder()
                        .name(faker.name().fullName())
                        .crm(faker.number().digits(6))
                        .specialty(SpecialtyType.values()[random.nextInt(SpecialtyType.values().length)])
                        .phone(faker.phoneNumber().cellPhone())
                        .email(faker.internet().emailAddress())
                        .build();
                doctorRepository.save(doctor);
            }
        }
    }
}
