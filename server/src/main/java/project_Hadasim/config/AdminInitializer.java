package project_Hadasim.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import project_Hadasim.model.UserRole;
import project_Hadasim.model.Users;
import project_Hadasim.repository.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String tzAdmin = "000000000";
    private String passwordAdmin = "admin1234";
    private String nameAdmin = "System Manager";

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByTz(tzAdmin).isEmpty()) {
            Users admin = new Users();
            admin.setTz(tzAdmin);
            admin.setFullName(nameAdmin);
            admin.setPassword(passwordEncoder.encode(passwordAdmin));
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin user created successfully");
        }
    }
}