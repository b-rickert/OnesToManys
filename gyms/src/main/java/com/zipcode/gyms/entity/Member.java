package com.zipcode.gyms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "member")
@Data

public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gym_id")
    private Long gymId;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(length = 100)
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Column(name = "membership_type", nullable = false, length = 50)
    private String membershipType;

    @Column(name = "fitness_goal", length = 100)
    private String fitnessGoal;

    @Column(name = "last_check_in_date")
    private LocalDate lastCheckInDate;

    @Column(name = "membership_status", nullable = false, length = 20)
    private String membershipStatus;

    @Column(name = "favorite_equipment", length = 50)
    private String favoriteEquipment;
    
}
