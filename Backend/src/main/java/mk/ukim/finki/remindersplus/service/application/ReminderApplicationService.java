package mk.ukim.finki.remindersplus.service.application;
import mk.ukim.finki.remindersplus.dto.CreateReminderDto;
import mk.ukim.finki.remindersplus.dto.DisplayReminderDto;
import mk.ukim.finki.remindersplus.model.domain.Reminder;
import java.util.List;
import java.util.Optional;

public interface ReminderApplicationService {
    List<DisplayReminderDto> findAllByUser(String username);
    Optional<DisplayReminderDto> findById(Long id, String username);
    DisplayReminderDto save(String username, CreateReminderDto reminder);
    DisplayReminderDto update(String username, Long id, CreateReminderDto reminder);
    void deleteById(String username, Long id);
}