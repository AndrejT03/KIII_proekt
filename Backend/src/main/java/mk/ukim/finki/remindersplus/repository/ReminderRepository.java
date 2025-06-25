package mk.ukim.finki.remindersplus.repository;
import mk.ukim.finki.remindersplus.model.domain.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByUserUsername(String Username);
    List<Reminder> findByUserUsernameAndCategoryId(String Username, Long categoryId);
    Optional<Reminder> findByIdAndUserUsername(Long id, String username);
}