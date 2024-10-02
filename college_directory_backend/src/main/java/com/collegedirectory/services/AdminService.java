package com.collegedirectory.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegedirectory.dto.FacultyProfileDTO;
import com.collegedirectory.dto.Role;
import com.collegedirectory.dto.StudentRequest;
import com.collegedirectory.entities.Course;
import com.collegedirectory.entities.Department;
import com.collegedirectory.entities.FacultyProfile;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.respositories.AttendanceRepository;
import com.collegedirectory.respositories.CourseRepository;
import com.collegedirectory.respositories.DepartmentRepository;
import com.collegedirectory.respositories.FacultyProfileRepository;
import com.collegedirectory.respositories.GradeRepository;
import com.collegedirectory.respositories.StudentProfileRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class AdminService {
	
	 @Autowired
	    private StudentProfileRepository studentProfileRepository;

	    @Autowired
	    private FacultyProfileRepository facultyProfileRepository;

	   @Autowired
	   private UserService userService;
	   
	   @Autowired
	   private CourseRepository courseRepository;
	   
	   @Autowired
	   private DepartmentRepository departmentRepository;
	   
	   @Autowired
	    private AttendanceRepository attendanceRepository;
	    
	    @Autowired
	    private GradeRepository gradeRepository;
	    
	    @Transactional
	    public void deleteAttendanceByStudentId(Long studentId) {
	        attendanceRepository.deleteByStudentUserId(studentId);
	    }
	    @Transactional
	    public void deleteGradesByStudentId(Long studentId) {
	        gradeRepository.deleteByStudentUserId(studentId);
	    }
	    
	    public List<StudentProfile> getAllStudents() {
	        return studentProfileRepository.findAll();
	    }

	    
	    public StudentProfile addStudent(StudentProfile studentRequest) {
	
	    	 User user = userService.findById(studentRequest.getUser().getId())
	                    .orElseThrow(() -> new RuntimeException("User not found"));
	    	 user.setRole(Role.STUDENT);
	    	 Department department = departmentRepository.getById(studentRequest.getDepartmentId());
	    	 studentRequest.setDepartmentName(department.getName());
	    	 studentRequest.setUser(user);
	        return studentProfileRepository.save(studentRequest);
	    }

	    
	    public Optional<StudentProfile> updateStudent(Long id, StudentProfile studentProfile) {
	        if (studentProfileRepository.existsById(id)) {
	        	StudentProfile existStudent = studentProfileRepository.findById(id).get();
	        	Department department = departmentRepository.findById(studentProfile.getDepartmentId()).get();
	        	existStudent.setDepartmentName(department.getName());
	        	existStudent.setDepartmentId(studentProfile.getDepartmentId());
	        	existStudent.setYear(studentProfile.getYear());
	            return Optional.of(studentProfileRepository.save(existStudent));
	        }
	        return Optional.empty();
	    }

	    @Transactional
	    public void deleteStudent(Long id) {
	        studentProfileRepository.deleteById(id);
	    }

	    
	    public List<FacultyProfile> getAllFaculty() {
	        return facultyProfileRepository.findAll();
	    }

	    
	    public FacultyProfile addFaculty(FacultyProfile facultyProfile) {
	    	 User user = userService.findById(facultyProfile.getUser().getId())
	                    .orElseThrow(() -> new RuntimeException("User not found"));
	    	 
	    	 user.setRole(Role.FACULTY);
	    	 Department department = departmentRepository.findById(facultyProfile.getDepartmentId()).get();
	    	 facultyProfile.setDepartmentName(department.getName());
	    	 
	    	    List<Course> assignedCourses = new ArrayList<>();

	    	    for (Course course : facultyProfile.getCourses()) {
	    	       
	    	        Course fetchedCourse = courseRepository.findById(course.getId())
	    	                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + course.getId()));
	   
	    	        assignedCourses.add(fetchedCourse);
	    	    }

	    	    facultyProfile.setCourses(assignedCourses);
	
	    	 facultyProfile.setUser(user);

	        return facultyProfileRepository.save(facultyProfile);
	    }

	    
	    public FacultyProfile updateFaculty(Long id, FacultyProfile facultyProfile) {
	        if (facultyProfileRepository.existsById(id)) {
	        	
	        	FacultyProfile existingFaculty = facultyProfileRepository.findById(id).get();
	        	
	        	 List<Course> assignedCourses = new ArrayList<>();

		    	    for (Course course : facultyProfile.getCourses()) {
		    	       
		    	        Course fetchedCourse = courseRepository.findById(course.getId())
		    	                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + course.getId()));
		   
		    	        assignedCourses.add(fetchedCourse);
		    	    }

		    	    existingFaculty.setCourses(assignedCourses);
		    	    
		    	    existingFaculty.setDepartmentId(facultyProfile.getDepartmentId());
		    	    
			    	 Department department = departmentRepository.findById(facultyProfile.getDepartmentId()).get();

		    	    
		    	    existingFaculty.setDepartmentName(department.getName());
		    	    
		    	    existingFaculty.setOfficeHours(facultyProfile.getOfficeHours());
		    	    
		    	    
	            return facultyProfileRepository.save(existingFaculty);
	        }
	        return null; 
	    }

	    
	    public void deleteFaculty(Long id) {
	        facultyProfileRepository.deleteById(id);
	    }


		public boolean studentExists(Long id) {
			
			return studentProfileRepository.existsById(id);
		}
		
		public void assignCoursesToFaculty(Long facultyId, List<Long> courseIds) {
	        FacultyProfile faculty = facultyProfileRepository.findById(facultyId)
	                .orElseThrow(() -> new EntityNotFoundException("Faculty not found"));

	        List<Course> courses = new ArrayList<>();
	        for (Long courseId : courseIds) {
	            Course course = courseRepository.findById(courseId)
	                    .orElseThrow(() -> new EntityNotFoundException("Course not found"));
	            courses.add(course);
	        }

	        faculty.setCourses(courses);
	        facultyProfileRepository.save(faculty);
	    }



}
