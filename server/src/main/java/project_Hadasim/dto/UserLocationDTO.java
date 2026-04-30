package project_Hadasim.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLocationDTO {
    private String tz;
    private double lat;
    private double lon;
    private LocalDateTime time;
}