package com.collegedirectory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseEnrollmentDTO {

	    private Long courseId;
	    private String courseName;
	    private int enrolledCount;


}
