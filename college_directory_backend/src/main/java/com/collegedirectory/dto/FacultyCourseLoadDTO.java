package com.collegedirectory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacultyCourseLoadDTO {

	 private Long facultyId;
	    private String facultyName;
	    private int totalCourses;
}
