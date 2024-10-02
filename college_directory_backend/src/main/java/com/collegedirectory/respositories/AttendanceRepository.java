package com.collegedirectory.respositories;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.collegedirectory.entities.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudent_UserId(Long studentId);
    
    @Modifying
    @Query("DELETE FROM Attendance a WHERE a.student.userId = :userId")
    void deleteByStudentUserId(@Param("userId") Long userId);
}
