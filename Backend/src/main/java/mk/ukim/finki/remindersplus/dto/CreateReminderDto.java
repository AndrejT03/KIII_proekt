package mk.ukim.finki.remindersplus.dto;
import mk.ukim.finki.remindersplus.model.domain.*;
import java.time.LocalDateTime;

public record CreateReminderDto(
        String title,
        String description,
        LocalDateTime dueDate,
        Integer priority,
        Long categoryId) {

    public Reminder toReminder(User user, Category category) {
        return new Reminder(
                title,
                description,
                dueDate,
                false,
                priority,
                user,
                category
        );
    }
}