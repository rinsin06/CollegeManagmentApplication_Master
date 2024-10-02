package com.collegedirectory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceAssignmentDTO {

	
	private Long studentId;
    private Long courseId;
    private int totalClasses;       
    private int classesAttended;   
}
