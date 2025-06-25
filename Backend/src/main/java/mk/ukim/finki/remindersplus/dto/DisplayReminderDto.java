package mk.ukim.finki.remindersplus.dto;
import mk.ukim.finki.remindersplus.model.domain.Reminder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record DisplayReminderDto(
        Long id,
        String title,
        String description,
        LocalDateTime dueDate,
        boolean completed,
        Integer priority,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String username,
        Long categoryId,
        String categoryName) {

    public static DisplayReminderDto from(Reminder reminder) {
        String categoryName = (reminder.getCategory() != null) ? reminder.getCategory().getName() : null;

        return new DisplayReminderDto(
                reminder.getId(),
                reminder.getTitle(),
                reminder.getDescription(),
                reminder.getDueDate(),
                reminder.isCompleted(),
                reminder.getPriority(),
                reminder.getCreatedAt(),
                reminder.getUpdatedAt(),
                reminder.getUser().getUsername(),
                (reminder.getCategory() != null) ? reminder.getCategory().getId() : null,
                categoryName
        );
    }

    public static List<DisplayReminderDto> from(List<Reminder> reminders) {
        return reminders.stream()
                .map(DisplayReminderDto::from)
                .collect(Collectors.toList());
    }
}
