package com.collegedirectory.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegedirectory.dto.AttendanceAssignmentDTO;
import com.collegedirectory.dto.AttendanceGradeDto;
import com.collegedirectory.dto.FacultyProfileDTO;
import com.collegedirectory.dto.GradeAssignmentDTO;
import com.collegedirectory.entities.Attendance;
import com.collegedirectory.entities.Course;
import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.Grade;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.respositories.CourseRepository;
import com.collegedirectory.respositories.GradeRepository;
import com.collegedirectory.services.FacultyService;
import com.collegedirectory.services.StudentAcademicService;
import com.collegedirectory.services.StudentService;
import com.collegedirectory.services.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyProfileService;
    
    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService; 
    
    @Autowired
    private StudentAcademicService studentAcademicService;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private GradeRepository gradeRepository;

    @GetMapping("/profile")
    public ResponseEntity<FacultyProfile> viewProfile(@AuthenticationPrincipal UserDetails userDetails) {
       
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        
        return facultyProfileService.findByUser(user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    
   
    @GetMapping("/classlist")
    public ResponseEntity<List<StudentProfile>>  manageClassList(@AuthenticationPrincipal UserDetails userDetails) {
    	User user = userService.findByUsername(userDetails.getUsername()).get();
    	 FacultyProfile faculty = facultyProfileService.findById(user.getId())
    	         .orElseThrow(() -> new EntityNotFoundException("Faculty profile not found"));
    	
    	 List<StudentProfile> students = studentService.getAllStudentsByDepartmentId(faculty.getDepartmentId());
               
    	 
    	 return ResponseEntity.ok(students);
    
    }

   
    @PutMapping("/profile")
    public ResponseEntity<FacultyProfile> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                        @RequestBody FacultyProfileDTO updatedProfile) {
    	
    	 Long userId = userService.findByUsername(userDetails.getUsername())
                 .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                 .getId();
        return facultyProfileService.updateFaculty(userId, updatedProfile)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Unable to update profile"));
    }
    
    @GetMapping("/courselist")
    public ResponseEntity<List<Course>> getCourseList(){
    	
    	 return new ResponseEntity<>(courseRepository.findAll(), HttpStatus.OK);
    }
    
    
    @PostMapping("/assign-attendance")
    public ResponseEntity<String> assignAttendance(@RequestBody List<AttendanceAssignmentDTO> dto) {
        try {
        	
        	for(AttendanceAssignmentDTO eachDto :  dto) {
        		
        		studentAcademicService.assignAttendance(eachDto);
        	}
        	
            return ResponseEntity.ok("Attendance assigned successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student or Course not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while assigning attendance.");
        }
    }
    
    
    @PostMapping("/assign-grade")
    public ResponseEntity<String> assignGrade(@RequestBody List<GradeAssignmentDTO> dto) {
        try {
        	for(GradeAssignmentDTO eachGrade: dto) {
        		
        		studentAcademicService.assignGrade(eachGrade);
        	}
        	
            return ResponseEntity.ok("Grade assigned successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student or Course not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while assigning grade.");
        }
    }
    
    @GetMapping("/grades/{studentId}")
    public ResponseEntity<List<Grade>> getGrades(@PathVariable Long studentId) {
        List<Grade> grades = studentAcademicService.getGradesByStudent(studentId);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/attendanceAndGrade/{studentId}")
    public ResponseEntity<List<AttendanceGradeDto>> getAttendance(@PathVariable Long studentId) {
    	List<AttendanceGradeDto> list = new ArrayList<>();
        List<Attendance> attendance = studentAcademicService.getAttendanceByStudent(studentId);
        for(Attendance attend : attendance) {
        AttendanceGradeDto response = new AttendanceGradeDto();
        response.setStudent(attend.getStudent());
        response.setCourse(attend.getCourse());
        response.setTotalClasses(attend.getTotalClasses());
        response.setClassesAttended(attend.getClassesAttended());
        
        Grade grade = gradeRepository.findByCourse_IdAndStudent_UserId(response.getCourse().getId(), response.getStudent().getUserId()).get();
        response.setGrade(grade.getGrade());
        list.add(response);        }
        return ResponseEntity.ok(list);
    }
}


