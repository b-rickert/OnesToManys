package com.zipcode.gyms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zipcode.gyms.entity.Gym;

@Repository
public interface GymRepository extends JpaRepository<Gym, Long> {

}
