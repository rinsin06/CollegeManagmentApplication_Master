package com.collegedirectory.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegedirectory.entities.Department;
import com.collegedirectory.entities.Enrollment;
import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.respositories.DepartmentRepository;
import com.collegedirectory.respositories.FacultyProfileRepository;
import com.collegedirectory.respositories.StudentProfileRepository;

@Service
public class StudentService {
	 @Autowired
	    private StudentProfileRepository studentProfileRepository;
	 
	 @Autowired
	    private FacultyProfileRepository facultyProfileRepository;
	 
	 @Autowired
	 private DepartmentRepository departmentRepository;
	 
	 public List<StudentProfile> searchStudents(String name, Long year ,Long departmentId) {
	        return studentProfileRepository.findByUserNameDepartmentAndYear(name, year,departmentId );
	    }


	    
	    public Optional<StudentProfile> findByUser(User user) {
	        return studentProfileRepository.findByUser(user);
	    }

	    
	    public List<StudentProfile> getAllStudents() {
	        return studentProfileRepository.findAll();
	    }
	    
	    public List<StudentProfile> getAllStudentsByDepartmentId(Long departmentId) {
	        return studentProfileRepository.findStudentsByDepartmentId(departmentId);
	    }

	    
	    public StudentProfile addStudent(StudentProfile studentProfile, User user) {
	    	studentProfile.setUser(user);
	    	Enrollment enrolled = new Enrollment();
	    	enrolled.setStudentId(studentProfile.getUser().getId());
	    	enrolled.setDepartmentId(studentProfile.getDepartmentId());
	    	Department department = departmentRepository.findById(studentProfile.getDepartmentId()).get();
	    	
	    	studentProfile.setDepartmentName(department.getName());

	        return studentProfileRepository.save(studentProfile);
	    }
	    
	    public List<FacultyProfile> getFacultyAdvisors(Long departmentId) {
	        return facultyProfileRepository.findByDepartmentId(departmentId);
	    }
	    
	    
	    public Optional<StudentProfile> updateStudent(Long id, StudentProfile studentProfile) {
	        if (studentProfileRepository.existsById(id)) {
	            studentProfile.setUserId(id);
	            return Optional.of(studentProfileRepository.save(studentProfile));
	        }
	        return Optional.empty();
	    }

	    
	    public void deleteStudent(Long id) {
	        studentProfileRepository.deleteById(id);
	    }



		public StudentProfile save(StudentProfile existingProfile) {
			
			return studentProfileRepository.save(existingProfile);
		}
}
