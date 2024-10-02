package com.collegedirectory.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileDTO {
	
	private String name;
	
	private String phone;
	
	private String photo;
	
	private String email;

}
