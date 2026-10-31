package com.tradelearn.backend;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173"
})
public class StudentController {

    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    public StudentController(
            StudentRepository studentRepository,
            EnrollmentRepository enrollmentRepository) {
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));
    }

    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String q) {
        if (q == null || q.isBlank()) {
            return studentRepository.findAll();
        }

        return studentRepository
                .findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        q.trim(), q.trim());
    }

    @GetMapping("/status/{status}")
    public List<Student> getStudentsByStatus(@PathVariable String status) {
        validateStatus(status);
        return studentRepository.findByStatusIgnoreCase(status);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student createStudent(@Valid @RequestBody Student student) {

        String email = student.getEmail().trim();

        if (studentRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A student with this email already exists");
        }

        student.setName(student.getName().trim());
        student.setEmail(email);
        student.setStatus("ACTIVE");

        if (student.getPhone() != null) {
            student.setPhone(student.getPhone().trim());
        }

        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    @Transactional
    public Student updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student updatedStudent) {

        Student student = findStudent(id);
        String email = updatedStudent.getEmail().trim();

        boolean emailAlreadyExists = studentRepository
                .findByEmailIgnoreCase(email)
                .filter(existing -> !existing.getId().equals(id))
                .isPresent();

        if (emailAlreadyExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Another student already uses this email");
        }

        student.setName(updatedStudent.getName().trim());
        student.setEmail(email);
        student.setPhone(
                updatedStudent.getPhone() == null
                        ? null
                        : updatedStudent.getPhone().trim());

        return studentRepository.save(student);
    }

    @PatchMapping("/{id}/status")
    @Transactional
    public Student updateStudentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        validateStatus(status);

        Student student = findStudent(id);
        student.setStatus(status.toUpperCase());

        return studentRepository.save(student);
    }

    @DeleteMapping("/{id}")
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable Long id) {

        Student student = findStudent(id);

        if (enrollmentRepository.existsByStudent_Id(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Delete this student's enrollments before deleting the student");
        }

        studentRepository.delete(student);
    }

    private Student findStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));
    }

    private void validateStatus(String status) {
        if (status == null ||
                (!status.equalsIgnoreCase("ACTIVE")
                && !status.equalsIgnoreCase("INACTIVE"))) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Status must be ACTIVE or INACTIVE");
        }
    }
}