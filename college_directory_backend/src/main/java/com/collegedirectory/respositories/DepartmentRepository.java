package com.collegedirectory.respositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.collegedirectory.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{
	
	

}
