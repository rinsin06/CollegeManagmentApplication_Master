package com.collegedirectory.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegedirectory.entities.Course;
import com.collegedirectory.respositories.CourseRepository;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepository repository;

	public Optional<Course> findById(Long courseId) {
		
		return repository.findById(courseId);
	}

}
