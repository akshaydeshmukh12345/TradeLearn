package com.tradelearn.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {

    List<CourseModule> findByCourse_IdOrderByPositionAsc(Long courseId);

    boolean existsByCourse_Id(Long courseId);
}