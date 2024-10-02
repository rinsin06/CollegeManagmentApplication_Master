package com.collegedirectory.dto;

import com.collegedirectory.entities.User;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest {
	
	
    private Long userId; 

    
    private String photo;

    
    private Long departmentId; 

  
    private String year;
    
    private User user;


}
