package com.zipcode.gyms.entity;

import jakarta.persistence.*;
import lombok.Data;

// Member entity maps to the "member" table
// Represents indivual gym members with their details
@Entity
@Table(name = "member")
@Data

public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // this is my foreign key and links this member to a gym (my "many" side to one-to-many)
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

    @Column(name = "date_of_birth", nullable = false, columnDefinition = "TEXT")
    private String dateOfBirth;

    @Column(name = "join_date", nullable = false, columnDefinition = "TEXT")
    private String joinDate;

    @Column(name = "membership_type", nullable = false, length = 50)
    private String membershipType;

    @Column(name = "fitness_goal", length = 100)
    private String fitnessGoal;

    // nullable set to true in the case that new members may have not checked in yet
    @Column(name = "last_check_in_date", nullable = true, columnDefinition = "TEXT")
    private String lastCheckInDate;

    @Column(name = "membership_status", nullable = false, length = 20)
    private String membershipStatus;

    @Column(name = "favorite_equipment", length = 50)
    private String favoriteEquipment;
    
}
