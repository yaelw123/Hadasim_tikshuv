package project_Hadasim.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    private String id;
    private String tz;
    private String fullName;
    private String password;
    private UserRole role;
}