package project_Hadasim.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project_Hadasim.model.Student;
import project_Hadasim.service.StudentService;

import java.util.List;


@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;
 @GetMapping("/all")
 public ResponseEntity<List<Student>>getallstudents()
 {
     return ResponseEntity.ok(studentService.getAllStudents());
 }

    @GetMapping("/{tz}")
    public ResponseEntity<Student> getStudentbytz(@PathVariable String tz) {
        return studentService.getStudentByTz(tz)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.addStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}