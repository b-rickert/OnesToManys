package com.zipcode.gyms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


// Gym entity maps to the "gym" table in the database
// @Data line is from Lombok and auto-generates all the getters/setters so I do less typing
@Entity
@Table(name = "gym")
@Data

public class Gym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Gym name is required")
    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 200)
    private String address;

    @Column(length = 50)
    private String city;

    @Column(length = 2)
    private String state;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "operating_hours", length = 50)
    private String operatingHours;

    @Column(name ="number_of_equipment")
    private Integer numberOfEquipment;

    @Column(name = "gym_type", length = 50)
    private String gymType;

    @Column(name = "monthly_rate")
    private BigDecimal monthlyRate;
    
}
