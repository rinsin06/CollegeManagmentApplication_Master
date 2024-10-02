package com.collegedirectory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegedirectory.entities.Attendance;
import com.collegedirectory.entities.Course;
import com.collegedirectory.entities.Grade;
import com.collegedirectory.services.StudentAcademicService;

@RestController
@RequestMapping("/api/students/academic")
public class StudentAcademicController {

    @Autowired
    private StudentAcademicService studentAcademicService;

    @GetMapping("/courses/{departmentId}")
    public ResponseEntity<List<Course>> getCourses(@PathVariable Long departmentId) {
        List<Course> courses = studentAcademicService.getCoursesByStudent(departmentId);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/grades/{studentId}")
    public ResponseEntity<List<Grade>> getGrades(@PathVariable Long studentId) {
        List<Grade> grades = studentAcademicService.getGradesByStudent(studentId);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/attendance/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendance(@PathVariable Long studentId) {
        List<Attendance> attendance = studentAcademicService.getAttendanceByStudent(studentId);
        return ResponseEntity.ok(attendance);
    }
    
 
}

