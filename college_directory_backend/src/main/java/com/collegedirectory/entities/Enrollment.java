package com.collegedirectory.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "enrollment")
@Getter
@Setter
@NoArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id")
    private Long studentId; 

    @Column(name = "course_id")
    private Long departmentId; 
    
    @Column(name = "enrollment_date")
    private LocalDate enrollmentDate;

    public Enrollment(Long studentId, Long courseId,LocalDate enrollmentDate) {
        this.studentId = studentId;
        this.departmentId = courseId;
        this.enrollmentDate = enrollmentDate;
    }
}
