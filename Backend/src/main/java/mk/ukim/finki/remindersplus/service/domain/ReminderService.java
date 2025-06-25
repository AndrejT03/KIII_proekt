package mk.ukim.finki.remindersplus.service.domain;
import mk.ukim.finki.remindersplus.model.domain.Reminder;
import java.util.List;
import java.util.Optional;

public interface ReminderService {
    List<Reminder> findAll(String username);
    Optional<Reminder> findById(Long id, String username);
    Reminder save(String username, Reminder reminder);
    Reminder update(String username, Long id, Reminder reminder);
    void deleteById(String username, Long id);
}
