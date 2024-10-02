package com.collegedirectory.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "faculty_profile")
@Getter
@Setter
@NoArgsConstructor
public class FacultyProfile {
    @Id
    @Column(name = "user_id")
    private Long userId; // Foreign key to User

    @Column
    private String photo;

    @Column(name = "department_id")
    private Long departmentId; // Foreign key to Department

    @Column
    private String officeHours;
    
    @Column
    private String departmentName;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user; 
    
    @ManyToMany
    @JoinTable(
        name = "faculty_course",
        joinColumns = @JoinColumn(name = "faculty_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses = new ArrayList<>();

    public FacultyProfile(Long userId, String photo, Long departmentId, String officeHours,String departmentName) {
        this.userId = userId;
        this.photo = photo;
        this.departmentId = departmentId;
        this.officeHours = officeHours;
        this.departmentName =departmentName;
    }
}

