package com.collegedirectory.dto;

import com.collegedirectory.entities.Course;
import com.collegedirectory.entities.StudentProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceGradeDto {
	private StudentProfile student;
	private Course course;
    private int totalClasses; 
    private int classesAttended;
    private String grade;
}
