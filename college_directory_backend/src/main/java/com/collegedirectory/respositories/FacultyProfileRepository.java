package com.collegedirectory.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;

@Repository
public interface FacultyProfileRepository extends JpaRepository<FacultyProfile, Long> {
    Optional<FacultyProfile> findByUser(User user);

	List<FacultyProfile> findByDepartmentId(Long departmentId);
    
	  Optional<List<StudentProfile>> findClassListByDepartmentId(User user); 
	  
	  Optional<FacultyProfile> findById(Long id);
	  
}
