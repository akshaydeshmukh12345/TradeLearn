package com.tradelearn.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByModule_IdOrderByPositionAsc(Long moduleId);
}