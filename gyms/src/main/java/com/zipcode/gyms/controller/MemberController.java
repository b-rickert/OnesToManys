package com.zipcode.gyms.controller;

import com.zipcode.gyms.entity.Member;
import com.zipcode.gyms.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

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

    // GET /api/members/995 - returns single member with id=995
    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        return memberRepository.findById(id).orElse(null);
    }

    // PUT /api/members/995 - updates member with id=995
    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Long id, @RequestBody Member member) {
        member.setId(id);
        return memberRepository.save(member);
    }

    // DELETE /api/members/995 - deletes member with id=995
    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Long id) {
        memberRepository.deleteById(id);
    }




    

    // curl -X POST http://localhost:8080/api/members \
  // -H "Content-Type: application/json" \
 //  -d '{
  //  "gymId": 5,
  //  "firstName": "John",
  // "lastName": "Demo",
   // "email": "john.demo@test.com",
   // "dateOfBirth": "1990-01-15",
  //  "joinDate": "2025-12-05",
   // "membershipType": "Monthly",
   // "membershipStatus": "Active"
 // }' | jq
}
