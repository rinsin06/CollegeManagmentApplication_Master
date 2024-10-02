package com.collegedirectory.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GradeAssignmentDTO {
    private Long studentId;
    private Long courseId;
    private String grade; 

    
}
