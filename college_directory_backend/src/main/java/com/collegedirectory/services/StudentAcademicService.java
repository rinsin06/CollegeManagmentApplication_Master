package com.collegedirectory.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegedirectory.dto.AttendanceAssignmentDTO;
import com.collegedirectory.dto.GradeAssignmentDTO;
import com.collegedirectory.entities.Attendance;
import com.collegedirectory.entities.Course;
import com.collegedirectory.entities.Grade;
import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;
import com.collegedirectory.respositories.AttendanceRepository;
import com.collegedirectory.respositories.CourseRepository;
import com.collegedirectory.respositories.GradeRepository;

@Service
public class StudentAcademicService {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private UserService userService;

    public List<Course> getCoursesByStudent(Long studentId) {
        
        return courseRepository.findByDepartmentId(studentId);
    }

    public List<Grade> getGradesByStudent(Long studentId) {
        return gradeRepository.findByStudent_UserId(studentId);
    }

    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudent_UserId(studentId);
    }
    
    public void assignAttendance(AttendanceAssignmentDTO dto) {
        Attendance attendance = new Attendance();
        StudentProfile student  = studentService.findByUser(userService.findById(dto.getStudentId()).get()).get();
        attendance.setStudent(student);
        attendance.setCourse(courseService.findById(dto.getCourseId()).get());
        attendance.setTotalClasses(dto.getTotalClasses());
        attendance.setClassesAttended(dto.getClassesAttended());

        attendanceRepository.save(attendance);
    }
    
    
    public void assignGrade(GradeAssignmentDTO dto) {
        Grade grade = new Grade();
        User user = userService.findById(dto.getStudentId()).get();
        StudentProfile student = studentService.findByUser(user).get();
        grade.setStudent(student);
        Course  course= courseService.findById(dto.getCourseId()).get() ;
        grade.setCourse(course);
        grade.setGrade(dto.getGrade());

        gradeRepository.save(grade);
    }
}

