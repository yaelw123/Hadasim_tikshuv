package project_Hadasim.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import project_Hadasim.model.Student;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByTz(String tz);

    List<Student> findAllByTeacherTz(String teacherTz);
}