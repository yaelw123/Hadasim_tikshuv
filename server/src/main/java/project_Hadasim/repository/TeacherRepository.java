package project_Hadasim.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import project_Hadasim.model.Teacher;

import java.util.Optional;

@Repository
public interface TeacherRepository extends MongoRepository<Teacher, String> {
    Optional<Teacher> findByTz(String tz);
    boolean existsByTz(String tz);

}
