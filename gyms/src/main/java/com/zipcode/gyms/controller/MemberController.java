package com.zipcode.gyms.controller;

import com.zipcode.gyms.entity.Member;
import com.zipcode.gyms.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Same thing as gym controller, tells spring this handles HTTP requests and returns JSON
@RestController

// All endpoints here start with /api/members
@RequestMapping("/api/members")
public class MemberController {

    // Spring injects the repository so I can query the database
    @Autowired
    private MemberRepository memberRepository;

    // GET /api/members and returns all 922 members
    // pretty straightforward, just dumps the whole member table
    @GetMapping
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // POST /api/members (creates a new member)
    @PostMapping
    public Member creatMember(@RequestBody Member member) {
        return memberRepository.save(member);
    }


    
}
