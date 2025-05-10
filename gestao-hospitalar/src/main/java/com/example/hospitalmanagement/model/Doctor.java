package com.example.hospitalmanagement.model;

import lombok.*;
import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String crm;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SpecialtyType specialty;

    private String phone;
    private String email;
}
