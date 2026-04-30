package project_Hadasim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project_Hadasim.dto.LoginRequestDTO;
import project_Hadasim.dto.TeacherRegistrationDTO;
import project_Hadasim.model.Users;
import project_Hadasim.security.JwtUtils;
import project_Hadasim.service.AuthService;
import project_Hadasim.service.TeacherService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private TeacherService teacherService;
    @Autowired
    private JwtUtils jwtUtils;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        Optional<Users> userOptional = authService.login(loginRequest);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            String token = jwtUtils.generateToken(user);
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "tz", user.getTz(),
                    "name", user.getFullName(),
                    "role", user.getRole().name(),
                    "expiresInMinutes", 30
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
    }
    @PostMapping("/register/teacher")
    public ResponseEntity<?> registerTeacher(@RequestBody TeacherRegistrationDTO dto) {
        try {
            teacherService.addTeacher(dto);
            return ResponseEntity.ok(Map.of("message", "Teacher registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }




}