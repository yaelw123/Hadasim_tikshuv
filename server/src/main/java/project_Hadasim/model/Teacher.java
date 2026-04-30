package project_Hadasim.model;//package project_Hadasim.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    @Id
    private String id;
    private String tz;
    private String fullName;
    private String grade;
    private double lat;
    private double lon;
    private LocalDateTime time;
}
