package com.collegedirectory.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.collegedirectory.dto.StudentProfileDTO;
import com.collegedirectory.entities.Department;
import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.exception.ResourceNotFoundException;
import com.collegedirectory.respositories.DepartmentRepository;
import com.collegedirectory.services.StudentService;
import com.collegedirectory.services.UserService;

import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/students")
@Log4j2
public class StudentController {

    @Autowired
    private StudentService studentProfileService;
    
    @Autowired 
    UserService userService;
    
    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping("/profile")
    public ResponseEntity<StudentProfile> viewProfile(@AuthenticationPrincipal UserDetails userDetails) {
    	log.info("Fetch the user entity based on the authenticated user : {}", userDetails );
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        log.info("User fetched {}", user);
        return studentProfileService.findByUser(user)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + user.getId()));
    }
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<StudentProfile>> searchStudents(
            @RequestParam String name, 
            @RequestParam(required = false) Long departmentId, 
            @RequestParam(required = false) Long year) {
        List<StudentProfile> students = studentProfileService.searchStudents(name, year, departmentId);
        if (students.isEmpty()) {
            throw new ResourceNotFoundException("No students found for the given criteria");
        }
        return ResponseEntity.ok(students);
    }

    @GetMapping("/faculty")
    public ResponseEntity<List<FacultyProfile>> listFacultyAdvisors(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Optional<StudentProfile> student = studentProfileService.findByUser(user);
        List<FacultyProfile> advisors = studentProfileService.getFacultyAdvisors(student.get().getDepartmentId());
        return ResponseEntity.ok(advisors);
    }
    
    @PutMapping(value = "/profile/update", consumes = "application/json")
    public ResponseEntity<String> updateProfile(@RequestBody StudentProfileDTO request, @AuthenticationPrincipal UserDetails userDetails) {
    	log.info("Received request body: {}", request);
        
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

       
        StudentProfile existingProfile = studentProfileService.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + user.getId()));

      
        User existingUser = userService.findById(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found for ID: " + user.getId()));

       
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new IllegalArgumentException("Name must not be null or empty");
        }
        if (request.getPhone() == null || request.getPhone().isEmpty()) {
            throw new IllegalArgumentException("Phone must not be null or empty");
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email must not be null or empty");
        }


        existingUser.setName(request.getName());
        existingUser.setPhone(request.getPhone());
        existingUser.setEmail(request.getEmail());
  
        userService.save(existingUser);

        existingProfile.setPhoto(request.getPhoto());

        StudentProfile savedProfile = studentProfileService.save(existingProfile);
        
        return ResponseEntity.ok("Student Updated");
    }

    
    
}

