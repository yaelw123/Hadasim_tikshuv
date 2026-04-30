package project_Hadasim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // חובה לייבא
import org.springframework.stereotype.Service;
import project_Hadasim.dto.LoginRequestDTO;
import project_Hadasim.model.Users;
import project_Hadasim.repository.UserRepository;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Users> login(LoginRequestDTO loginRequest) {
        return userRepository.findByTz(loginRequest.getTz())
                .filter(user -> passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()));
    }
}