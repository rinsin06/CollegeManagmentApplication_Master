package com.collegedirectory.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.collegedirectory.entities.Grade;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudent_UserId(Long studentId);
    
    Optional<Grade> findByCourseId(Long courseId);
    
    Optional<Grade> findByCourse_IdAndStudent_UserId(Long courseId, Long studentId);
    
    @Modifying
    @Query("DELETE FROM Grade g WHERE g.student.userId = :userId") // Adjust this if your Grade entity is structured differently
    void deleteByStudentUserId(@Param("userId") Long userId);
}

