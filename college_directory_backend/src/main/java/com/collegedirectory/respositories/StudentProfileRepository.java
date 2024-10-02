package com.collegedirectory.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.collegedirectory.entities.StudentProfile;
import com.collegedirectory.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {

	@Query("SELECT sp FROM StudentProfile sp WHERE " +
		       "LOWER(sp.user.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
		       "AND (:departmentId IS NULL OR sp.departmentId = :departmentId) " +
		       "AND (:year IS NULL OR sp.year = :year)")
    List<StudentProfile> findByUserNameDepartmentAndYear(@Param("name") String name, 
                                                         @Param("year") Long year, 
                                                         @Param("departmentId") Long departmentId);

    Optional<StudentProfile> findByUser(User user);
    
    @Query("SELECT sp FROM StudentProfile sp WHERE sp.departmentId = :departmentId")
    List<StudentProfile> findStudentsByDepartmentId(@Param("departmentId") Long departmentId);
}
