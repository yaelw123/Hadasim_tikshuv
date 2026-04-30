package project_Hadasim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_Hadasim.dto.DeviceLocationDTO;
import project_Hadasim.model.Student;
import project_Hadasim.model.Teacher;
import project_Hadasim.repository.StudentRepository;
import project_Hadasim.repository.TeacherRepository;
import  project_Hadasim.dto.UserLocationDTO;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class LocationService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int radius = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double x = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
        return radius * y;
    }
    public double convertToDecimal(DeviceLocationDTO.Angle angle) {
        double d = Double.parseDouble(angle.getDegrees());
        double m = Double.parseDouble(angle.getMinutes());
        double s = Double.parseDouble(angle.getSeconds().isEmpty() ? "0" : angle.getSeconds());
        return d + (m / 60.0) + (s / 3600.0);
    }
    public LocalDateTime parseTime(String timeStr) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy MM dd'T'HH:mm:ss'Z'", Locale.ENGLISH);
            return LocalDateTime.parse(timeStr, formatter);
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }
    public Student updateStudentLocationFromDevice(DeviceLocationDTO deviceDto) {
        double lat = convertToDecimal(deviceDto.getCoordinates().getLatitude());
        double lon = convertToDecimal(deviceDto.getCoordinates().getLongitude());
        LocalDateTime time = parseTime(deviceDto.getTime());
       // LocalDateTime time = LocalDateTime.now();
        Student s = studentRepository.findByTz(deviceDto.getID())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        s.setLat(lat);
        s.setLon(lon);
        s.setTime(time);
        return studentRepository.save(s);
    }

    public Teacher updateTeacherLocationFromDevice(DeviceLocationDTO deviceDto) {
        double lat = convertToDecimal(deviceDto.getCoordinates().getLatitude());
        double lon = convertToDecimal(deviceDto.getCoordinates().getLongitude());
        LocalDateTime time = parseTime(deviceDto.getTime());
        Teacher t = teacherRepository.findByTz(deviceDto.getID())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        t.setLat(lat);
        t.setLon(lon);
        t.setTime(time);
        return teacherRepository.save(t);
    }
    public List<UserLocationDTO> getAllStudentLocations() {
        return studentRepository.findAll().stream()
                .map(s -> new UserLocationDTO(s.getTz(), s.getLat(), s.getLon(), s.getTime()))
                .collect(Collectors.toList());
    }
    public List<UserLocationDTO> getDistantStudents(String teacherTz) {
        Teacher teacher = teacherRepository.findByTz(teacherTz)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        if (teacher.getLat() == 0 && teacher.getLon() == 0) {
            teacher.setLat(31.5);
            teacher.setLon(34.8);
            teacher.setTime(LocalDateTime.now());
            teacherRepository.save(teacher);}
        return studentRepository.findAllByTeacherTz(teacherTz).stream()
                .filter(s -> s.getLat() != 0 && s.getLon() != 0)
                .filter(s -> calculateDistance(teacher.getLat(), teacher.getLon(), s.getLat(), s.getLon()) > 3.0)
                .map(s -> new UserLocationDTO(s.getTz(), s.getLat(), s.getLon(), s.getTime()))
                .toList();
    }

    public List<UserLocationDTO> getStudentsByTeacher(String teacherTz) {
        return studentRepository.findAllByTeacherTz(teacherTz).stream()
                .filter(s -> s.getLat() != 0 && s.getLon() != 0)
                .map(s -> new UserLocationDTO(s.getTz(), s.getLat(), s.getLon(), s.getTime()))
                .collect(Collectors.toList());
    }


}