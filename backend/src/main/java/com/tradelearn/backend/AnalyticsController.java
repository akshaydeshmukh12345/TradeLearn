package com.tradelearn.backend;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173"
})
public class AnalyticsController {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AnalyticsController(
            CourseRepository courseRepository,
            StudentRepository studentRepository,
            EnrollmentRepository enrollmentRepository) {

        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @GetMapping("/dashboard")
    @Transactional(readOnly = true)
    public DashboardAnalytics getDashboardAnalytics() {

        long totalCourses = courseRepository.count();
        long totalStudents = studentRepository.count();
        long totalEnrollments = enrollmentRepository.count();

        long activeEnrollments =
                enrollmentRepository.countByStatusIgnoreCase("ACTIVE");

        long inactiveEnrollments =
                enrollmentRepository.countByStatusIgnoreCase("INACTIVE");

        List<CourseAnalytics> courseAnalytics =
                courseRepository.findAll()
                        .stream()
                        .map(course -> new CourseAnalytics(
                                course.getId(),
                                course.getTitle(),
                                enrollmentRepository.countByCourse_Id(
                                        course.getId()
                                )
                        ))
                        .toList();

        return new DashboardAnalytics(
                totalCourses,
                totalStudents,
                totalEnrollments,
                activeEnrollments,
                inactiveEnrollments,
                courseAnalytics
        );
    }

    public record DashboardAnalytics(
            long totalCourses,
            long totalStudents,
            long totalEnrollments,
            long activeEnrollments,
            long inactiveEnrollments,
            List<CourseAnalytics> courseAnalytics
    ) {
    }

    public record CourseAnalytics(
            Long courseId,
            String courseTitle,
            long enrollmentCount
    ) {
    }
}