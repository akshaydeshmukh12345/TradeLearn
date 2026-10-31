package com.tradelearn.backend;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173"
})
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentController(
            EnrollmentRepository enrollmentRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    // Get all enrollments
    @GetMapping
    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get enrollment by ID
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public EnrollmentResponse getEnrollmentById(@PathVariable Long id) {

        Enrollment enrollment = findEnrollment(id);
        return toResponse(enrollment);
    }

    // Get enrollments by student
    @GetMapping("/student/{studentId}")
    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getStudentEnrollments(
            @PathVariable Long studentId) {

        if (!studentRepository.existsById(studentId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Student not found"
            );
        }

        return enrollmentRepository.findByStudent_Id(studentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get enrollments by course
    @GetMapping("/course/{courseId}")
    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getCourseEnrollments(
            @PathVariable Long courseId) {

        if (!courseRepository.existsById(courseId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Course not found"
            );
        }

        return enrollmentRepository.findByCourse_Id(courseId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get enrollments by status
    @GetMapping("/status/{status}")
    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getEnrollmentsByStatus(
            @PathVariable String status) {

        validateStatus(status);

        return enrollmentRepository.findByStatusIgnoreCase(status)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Create enrollment
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public EnrollmentResponse createEnrollment(
            @RequestBody EnrollmentRequest request) {

        if (request.studentId() == null || request.courseId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Student ID and Course ID are required"
            );
        }

        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"
                ));

        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Course not found"
                ));

        if (!"ACTIVE".equalsIgnoreCase(student.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Inactive students cannot be enrolled"
            );
        }

        boolean alreadyEnrolled =
                enrollmentRepository.existsByStudent_IdAndCourse_Id(
                        request.studentId(),
                        request.courseId()
                );

        if (alreadyEnrolled) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Student is already enrolled in this course"
            );
        }

        Enrollment enrollment = new Enrollment(student, course);
        Enrollment saved = enrollmentRepository.save(enrollment);

        return toResponse(saved);
    }

    // Update enrollment status
    @PatchMapping("/{id}/status")
    @Transactional
    public EnrollmentResponse updateEnrollmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        validateStatus(status);

        Enrollment enrollment = findEnrollment(id);
        enrollment.setStatus(status.toUpperCase());

        return toResponse(enrollmentRepository.save(enrollment));
    }

    // Delete enrollment
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void deleteEnrollment(@PathVariable Long id) {

        Enrollment enrollment = findEnrollment(id);
        enrollmentRepository.delete(enrollment);
    }

    // Helper: find enrollment
    private Enrollment findEnrollment(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Enrollment not found"
                ));
    }

    // Helper: validate status
    private void validateStatus(String status) {
        if (status == null ||
                (!status.equalsIgnoreCase("ACTIVE")
                && !status.equalsIgnoreCase("INACTIVE"))) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Status must be ACTIVE or INACTIVE"
            );
        }
    }

    // Convert entity into safe API response
    private EnrollmentResponse toResponse(Enrollment enrollment) {

        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getStudent().getId(),
                enrollment.getStudent().getName(),
                enrollment.getStudent().getEmail(),
                enrollment.getCourse().getId(),
                enrollment.getCourse().getTitle(),
                enrollment.getCourse().getPrice(),
                enrollment.getStatus(),
                enrollment.getEnrolledAt()
        );
    }

    // Request DTO
    public record EnrollmentRequest(
            Long studentId,
            Long courseId
    ) {
    }

    // Response DTO
    public record EnrollmentResponse(
            Long id,
            Long studentId,
            String studentName,
            String studentEmail,
            Long courseId,
            String courseTitle,
            double coursePrice,
            String status,
            LocalDateTime enrolledAt
    ) {
    }
}