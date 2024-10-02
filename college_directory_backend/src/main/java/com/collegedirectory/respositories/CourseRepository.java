package com.collegedirectory.respositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.collegedirectory.entities.Course;


@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
   
    
    List<Course> findByDepartmentId(Long departmentId);
}
