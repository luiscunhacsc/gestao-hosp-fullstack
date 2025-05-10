package com.example.hospitalmanagement.model;

import lombok.*;
import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(nullable = false)
    private String medicines;

    @Lob
    private String instructions;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
}
