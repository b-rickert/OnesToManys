package com.zipcode.gyms.repository;

import com.zipcode.gyms.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// just like GymRepository, handles database operations for Member 
// also gets all standard CRUD methods from JpaRepository 
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // custom query method - Spring automatically implements this based on the method name
    // "findBy" + "GymId" tells Spring: SELECT * FROM member WHERE gym_id = ?
    // this is how we get all members for a specific gym (the one-to-many relationship)
    List<Member> findByGymId(Long gymId);
}