package project_Hadasim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project_Hadasim.model.Student;
import project_Hadasim.model.Teacher;
import project_Hadasim.service.TeacherService;

import java.util.List;
@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/all")
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{tz}")
    public ResponseEntity<Teacher> getTeacherByTz(@PathVariable String tz) {
        return teacherService.getTeacherByTz(tz)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/{teacherTz}/students")
    public ResponseEntity<List<Student>> getStudentsByTeacher(@PathVariable String teacherTz) {
        try {
            List<Student> results = teacherService.getStudentsByTeacher(teacherTz);
            if (results.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}