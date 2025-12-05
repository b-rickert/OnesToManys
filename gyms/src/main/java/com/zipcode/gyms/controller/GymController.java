package com.zipcode.gyms.controller;

import com.zipcode.gyms.entity.Gym;
import com.zipcode.gyms.repository.GymRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gyms")
public class GymController {

    @Autowired
    private GymRepository gymRepository;

    @GetMapping
    public List<Gym> getAllGyms() {
        return gymRepository.findAll();
    }
}
