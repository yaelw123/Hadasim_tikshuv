
package project_Hadasim.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project_Hadasim.dto.TeacherRegistrationDTO;
import project_Hadasim.model.Student;
import project_Hadasim.model.Teacher;
import project_Hadasim.model.Users;
import project_Hadasim.model.UserRole;
import project_Hadasim.repository.StudentRepository;
import project_Hadasim.repository.TeacherRepository;
import project_Hadasim.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void addTeacher(TeacherRegistrationDTO dto) {
        if (userRepository.existsByTz(dto.getTz())) {
            throw new RuntimeException("User already exist");
        }
        if (teacherRepository.existsByTz(dto.getTz())) {
            throw new RuntimeException("Teacher exist");
        }
        Users user = new Users();
        user.setTz(dto.getTz());
        user.setFullName(dto.getFullName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(UserRole.TEACHER);
        userRepository.save(user);
        Teacher teacher = new Teacher();
        teacher.setTz(dto.getTz());
        teacher.setFullName(dto.getFullName());
        teacher.setGrade(dto.getGrade());
        teacherRepository.save(teacher);
    }
    public List<Student> getStudentsByTeacher(String teacherTz) {
        return studentRepository.findAllByTeacherTz(teacherTz);
    }
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    public Optional<Teacher> getTeacherByTz(String tz) {
        return teacherRepository.findByTz(tz);
    }
}