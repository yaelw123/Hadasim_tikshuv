package project_Hadasim.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import project_Hadasim.model.Users;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<Users, String> {
    Optional<Users> findByTz(String tz);
    boolean existsByTz(String tz);
}