package com.tradelearn.backend;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173"
})
public class CourseController {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CourseController(
            CourseRepository courseRepository,
            CourseModuleRepository moduleRepository,
            EnrollmentRepository enrollmentRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    @Transactional
    public Course updateCourse(
            @PathVariable Long id,
            @RequestBody Course updatedCourse) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course not found"));

        course.setTitle(updatedCourse.getTitle());
        course.setDescription(updatedCourse.getDescription());
        course.setCategory(updatedCourse.getCategory());
        course.setLevel(updatedCourse.getLevel());
        course.setPrice(updatedCourse.getPrice());
        course.setInstructor(updatedCourse.getInstructor());

        return courseRepository.save(course);
    }

    @DeleteMapping("/{id}")
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course not found"));

        if (enrollmentRepository.existsByCourse_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Delete this course's enrollments before deleting the course");
        }

        courseRepository.delete(course);
    }

    @GetMapping("/{id}/curriculum")
    @Transactional(readOnly = true)
    public List<ModuleResponse> getCourseCurriculum(@PathVariable Long id) {

        if (!courseRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Course not found");
        }

        List<CourseModule> modules =
                moduleRepository.findByCourse_IdOrderByPositionAsc(id);

        List<ModuleResponse> moduleResponses = new ArrayList<>();

        for (CourseModule module : modules) {

            List<LessonResponse> lessonResponses = new ArrayList<>();

            for (Lesson lesson : module.getLessons()) {
                lessonResponses.add(new LessonResponse(
                        lesson.getId(),
                        lesson.getTitle(),
                        lesson.getDuration(),
                        lesson.getPosition()
                ));
            }

            moduleResponses.add(new ModuleResponse(
                    module.getId(),
                    module.getTitle(),
                    module.getPosition(),
                    lessonResponses
            ));
        }

        return moduleResponses;
    }

    public record ModuleResponse(
            Long id,
            String title,
            int position,
            List<LessonResponse> lessons
    ) {}

    public record LessonResponse(
            Long id,
            String title,
            String duration,
            int position
    ) {}
}