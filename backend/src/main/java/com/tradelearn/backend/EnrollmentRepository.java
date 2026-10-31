package com.tradelearn.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudent_Id(Long studentId);

    List<Enrollment> findByCourse_Id(Long courseId);

    List<Enrollment> findByStatusIgnoreCase(String status);

    Optional<Enrollment> findByStudent_IdAndCourse_Id(
            Long studentId,
            Long courseId
    );

    boolean existsByStudent_IdAndCourse_Id(
            Long studentId,
            Long courseId
    );

    boolean existsByStudent_Id(Long studentId);

    boolean existsByCourse_Id(Long courseId);

    long countByStatusIgnoreCase(String status);

    // Analytics: course-wise enrollment count
    long countByCourse_Id(Long courseId);
}