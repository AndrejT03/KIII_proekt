package mk.ukim.finki.remindersplus.model.domain;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Reminder> reminders = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Category(String name, String description) {
        this.name = name;
        this.description = description;
        this.reminders = new HashSet<>();
    }

    public Category(String name, String description, User user) {
        this.name = name;
        this.description = description;
        this.user = user;
        this.reminders = new HashSet<>();
    }
}