package com.zipcode.gyms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zipcode.gyms.entity.Gym;


// GymRepository handles all database operations for Gym
// extends JpaRepository which allows me to utilize CRUD without writing each method individually
// JpaResository includes finaAll(), findById(), save(), delete(), ect.
@Repository
public interface GymRepository extends JpaRepository<Gym, Long> {

}
