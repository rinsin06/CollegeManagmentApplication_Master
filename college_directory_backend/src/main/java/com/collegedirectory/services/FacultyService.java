package com.collegedirectory.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegedirectory.dto.FacultyProfileDTO;
import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.exception.ResourceNotFoundException;
import com.collegedirectory.respositories.FacultyProfileRepository;

@Service
public class FacultyService {

    @Autowired
    private FacultyProfileRepository facultyProfileRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private StudentService studentService;

    
    public Optional<FacultyProfile> findByUser(User user) {
        return facultyProfileRepository.findByUser(user);
    }

    
    public List<FacultyProfile> getAllFaculty() {
        return facultyProfileRepository.findAll();
    }

    
    public FacultyProfile addFaculty(FacultyProfile facultyProfile) {
        return facultyProfileRepository.save(facultyProfile);
    }
    
    public List<FacultyProfile> getFacultyAdvisors(Long departmentId) {
        return facultyProfileRepository.findByDepartmentId(departmentId);
    }

    
    
    public Optional<FacultyProfile> updateFaculty(Long id, FacultyProfileDTO facultyProfile) {
        if (facultyProfileRepository.existsById(id)) {
        	FacultyProfile faculty = facultyProfileRepository.findById(id).get();
        	faculty.setOfficeHours(facultyProfile.getOfficeHours());
        	faculty.setPhoto(facultyProfile.getPhoto());
        	
        	  User existingUser = userService.findById(id)
                      .orElseThrow(() -> new ResourceNotFoundException("User not found for ID: " + id));

             
              if (facultyProfile.getName() == null || facultyProfile.getName().isEmpty()) {
                  throw new IllegalArgumentException("Name must not be null or empty");
              }
              if (facultyProfile.getPhone() == null || facultyProfile.getPhone().isEmpty()) {
                  throw new IllegalArgumentException("Phone must not be null or empty");
              }
              if (facultyProfile.getEmail() == null || facultyProfile.getEmail().isEmpty()) {
                  throw new IllegalArgumentException("Email must not be null or empty");
              }


              existingUser.setName(facultyProfile.getName());
              existingUser.setPhone(facultyProfile.getPhone());
              existingUser.setEmail(facultyProfile.getEmail());
        
            faculty.setUser(existingUser);
            return Optional.of(facultyProfileRepository.save(faculty)); 
        }
        return Optional.empty(); 
    }
    

    
    public Optional<FacultyProfile> findById(Long id){
    	
    	return facultyProfileRepository.findById(id);
    }
    public void deleteFaculty(Long id) {
        facultyProfileRepository.deleteById(id);
    }


	public Object getFacultyCourseLoad(String orElse) {
		
		return null;
	}


	
}
