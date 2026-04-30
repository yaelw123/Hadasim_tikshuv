package project_Hadasim.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project_Hadasim.dto.DeviceLocationDTO;
import project_Hadasim.dto.UserLocationDTO;
import project_Hadasim.service.LocationService;


import java.util.List;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService LocationService;

    @PostMapping("/update/student")
    public ResponseEntity<?> updateStudentLocation(@RequestBody DeviceLocationDTO deviceDto) {
        try {
            LocationService.updateStudentLocationFromDevice(deviceDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/update/teacher")
    public ResponseEntity<?> updateTeacherLocation(@RequestBody DeviceLocationDTO deviceDto) {
        try {
            return ResponseEntity.ok(LocationService.updateTeacherLocationFromDevice(deviceDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/distance/{teacherTz}")
    public ResponseEntity<List<UserLocationDTO>> getDistantStudents(@PathVariable String teacherTz) {
        try {
            return ResponseEntity.ok(LocationService.getDistantStudents(teacherTz));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserLocationDTO>> getAllLocations(Authentication authentication) {
        try {
            String currentTz = authentication.getName();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (isAdmin) {
                return ResponseEntity.ok(LocationService.getAllStudentLocations());
            } else {
                return ResponseEntity.ok(LocationService.getStudentsByTeacher(currentTz));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}