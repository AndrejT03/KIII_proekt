package mk.ukim.finki.remindersplus.config;
import jakarta.annotation.PostConstruct;
import mk.ukim.finki.remindersplus.model.domain.Category;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.model.enumerations.Role;
import mk.ukim.finki.remindersplus.repository.CategoryRepository;
import mk.ukim.finki.remindersplus.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, CategoryRepository categoryRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // @PostConstruct
    public void init () {
        categoryRepository.save(new Category("Home", "About Home"));
        categoryRepository.save(new Category("Work", "About Work"));
        categoryRepository.save(new Category("Sport", "About Sport"));
        categoryRepository.save(new Category("Pet", "About Pet"));
        categoryRepository.save(new Category("Medications", "About Pills"));
        userRepository.save(new User(
                "at",
                passwordEncoder.encode("at"),
                "Andrej",
                "Trajkovski",
                Role.ROLE_ADMIN
        ));
    }
}
