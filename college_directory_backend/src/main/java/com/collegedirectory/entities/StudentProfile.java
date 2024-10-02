package com.collegedirectory.entities;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student_profile")
@Getter
@Setter
@NoArgsConstructor
public class StudentProfile {
    @Id
    @Column(name = "user_id")
    private Long userId; 

    @Column
    private String photo;

    @Column(name = "department_id")
    private Long departmentId;

    @Column
    private String year;
    
    @Column
    private String departmentName;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    public StudentProfile(Long userId, String photo, Long departmentId, String year) {
        this.userId = userId;
        this.photo = photo;
        this.departmentId = departmentId;
        this.year = year;
    }
}
