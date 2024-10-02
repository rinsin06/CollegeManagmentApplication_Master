package com.collegedirectory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegedirectory.entities.Course;
import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.exception.InvalidDataException;
import com.collegedirectory.exception.ResourceNotFoundException;
import com.collegedirectory.respositories.CourseRepository;
import com.collegedirectory.respositories.FacultyProfileRepository;
import com.collegedirectory.respositories.StudentProfileRepository;
import com.collegedirectory.respositories.UserRepository;
import com.collegedirectory.services.AdminService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private FacultyProfileRepository  faculityProfileRepository;
    
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StudentProfileRepository studentProfileRepository;
    
    @Autowired
    CourseRepository courseRepository;

    @GetMapping("/students")
    public ResponseEntity<List<StudentProfile>> getAllStudents() {
    	
    	List<StudentProfile> students = adminService.getAllStudents();
        if (students.isEmpty()) {
            throw new ResourceNotFoundException("No students found");
        }
        return ResponseEntity.ok(students);
    }

    @PostMapping("/students")
    public ResponseEntity<StudentProfile> addStudent(@RequestBody StudentProfile studentProfile) {
    	 if (studentProfile.getUser() == null) {
             throw new InvalidDataException("User cannot be null");
         }
        StudentProfile createdStudent = adminService.addStudent(studentProfile);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<StudentProfile> updateStudent(@PathVariable Long id, @RequestBody StudentProfile studentProfile) {
        return adminService.updateStudent(id, studentProfile)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Student with ID " + id + " not found"));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
    	if (!adminService.studentExists(id)) {
            throw new ResourceNotFoundException("Student with ID " + id + " not found");
        }
        
        adminService.deleteAttendanceByStudentId(id);
        adminService.deleteGradesByStudentId(id);
        
        StudentProfile student = studentProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student with ID " + id + " not found"));

        User user = userRepository.findById(student.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + student.getUserId() + " not found"));

        user.setRole(null);  
        adminService.deleteStudent(id);
        
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/faculty")
    public ResponseEntity<List<FacultyProfile>> getAllFaculty() {
    	List<FacultyProfile> faculty = adminService.getAllFaculty();
        if (faculty.isEmpty()) {
            throw new ResourceNotFoundException("No faculty found");
        }
        return ResponseEntity.ok(faculty);
    }

    @PostMapping("/faculty")
    public ResponseEntity<String> addFaculty(@RequestBody FacultyProfile facultyProfile) {
    	if (facultyProfile.getUser() == null) {
            throw new InvalidDataException("User cannot be null");
        }
        FacultyProfile createdFaculty = adminService.addFaculty(facultyProfile);
        return ResponseEntity.status(HttpStatus.CREATED).body("Created Succesfully");
    }

    @PutMapping("/faculty")
    public ResponseEntity<String> updateFaculty( @RequestBody  FacultyProfile facultyProfile) {
        if (faculityProfileRepository.existsById(facultyProfile.getUser().getId())) {
        	adminService.updateFaculty(facultyProfile.getUser().getId(), facultyProfile);
        	return ResponseEntity.ok("Updated");
        }else {
        	
        	throw new ResourceNotFoundException("Faculty with ID  not found");
        	 
        }
 
    }
    
    @GetMapping("/userlist")
    public ResponseEntity<List<User>> getUserList(){
    	
    	 return new ResponseEntity<>(userRepository.findByRoleIsNull(), HttpStatus.OK);
    }
    
    @GetMapping("/courselist")
    public ResponseEntity<List<Course>> getCourseList(){
    	
    	 return new ResponseEntity<>(courseRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/faculty/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
    	 if (!faculityProfileRepository.existsById(id)) {
             throw new ResourceNotFoundException("Faculty with ID " + id + " not found");
         }
    	 
    	FacultyProfile faculty = faculityProfileRepository.findById(id).get();
    	
    	User user = userRepository.findById(faculty.getUserId()).get();
    	
    	user.setRole(null);
        adminService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/faculty/{facultyId}/assign-courses")
    public ResponseEntity<String> assignCoursesToFaculty(
            @PathVariable Long facultyId,
            @RequestBody List<Long> courseIds) {
        try {
        	adminService.assignCoursesToFaculty(facultyId, courseIds);
            return ResponseEntity.ok("Courses assigned successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Faculty or Course not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

}
