package project_Hadasim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_Hadasim.model.Student;
import project_Hadasim.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;


    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentByTz(String tz) {
        return studentRepository.findByTz(tz);
    }

    public Student addStudent(Student student) {
        Optional<Student> existingStudent = studentRepository.findByTz(student.getTz());
        if (existingStudent.isPresent()) {
            throw new RuntimeException("exist");
        }
        return studentRepository.save(student);
    }

    public void saveStudent(Student s)
    {
        studentRepository.save(s);
    }

}