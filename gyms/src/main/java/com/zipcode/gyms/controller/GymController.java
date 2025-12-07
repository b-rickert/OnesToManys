package com.zipcode.gyms.controller;

import com.zipcode.gyms.entity.Gym;
import com.zipcode.gyms.entity.Member;
import com.zipcode.gyms.repository.GymRepository;
import com.zipcode.gyms.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// this tells spring to handle this class with HTTP requests and return JSON
@RestController

// all endpoints listed in this class start with /api/gyms
@RequestMapping("/api/gyms")
public class GymController {

    // Autowired means Spring auto-wires (injects) the repository so I can use it
    // basically gives me access to the database operations without having to express it myself
    @Autowired
    private GymRepository gymRepository;

    // Need this to get members by gym ID
    @Autowired
    private MemberRepository memberRepository;

    // GET /api/gyms and returns ALL gyms
    @GetMapping
    public List<Gym> getAllGyms() {
        return gymRepository.findAll();
    } 

    // GET /api/gyms/1 and returns gym with id = 1 (aka my first gym)
    // @PathVariable grabs the {id} from the URL
    @GetMapping("/{id}")
    public Gym getGymById(@PathVariable Long id) {
        // findById returns an Optional<Gym>, orElse(null) gives me null if user searches wrong/unlisted gym ID #
        return gymRepository.findById(id).orElse(null);
    }

    // GET api/gyms/1/members and returns all members for gym 1 with id = 1
    // this demonstrates my one-to-many relationship
    @GetMapping("/{id}/members")
    public List<Member> getMembersByGymId(@PathVariable Long id) {
        return memberRepository.findByGymId(id);
    }

   
}
