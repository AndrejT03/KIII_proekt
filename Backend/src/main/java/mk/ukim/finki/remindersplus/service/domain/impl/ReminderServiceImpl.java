package mk.ukim.finki.remindersplus.service.domain.impl;
import mk.ukim.finki.remindersplus.model.domain.Category;
import mk.ukim.finki.remindersplus.model.domain.Reminder;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.repository.CategoryRepository;
import mk.ukim.finki.remindersplus.repository.ReminderRepository;
import mk.ukim.finki.remindersplus.repository.UserRepository;
import mk.ukim.finki.remindersplus.service.domain.ReminderService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReminderServiceImpl implements ReminderService {
    private final ReminderRepository reminderRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ReminderServiceImpl(ReminderRepository reminderRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.reminderRepository = reminderRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Reminder> findAll(String username) {
        return reminderRepository.findByUserUsername(username);
    }

    @Override
    public Optional<Reminder> findById(Long id, String username) {
        return reminderRepository.findByIdAndUserUsername(id, username);
    }

    @Override
    public Reminder save(String username, Reminder reminder) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (reminder.getCategory() != null) {
            Long categoryId = reminder.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            reminder.setCategory(category);
        }

        reminder.setUser(user);
        reminder.setCompleted(false);
        return reminderRepository.save(reminder);
    }

    @Override
    public Reminder update(String username, Long id, Reminder updatedReminder) {
        Reminder existingReminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        if (!existingReminder.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You are not authorized to update this reminder");
        }

        existingReminder.setTitle(updatedReminder.getTitle());
        existingReminder.setDescription(updatedReminder.getDescription());
        existingReminder.setDueDate(updatedReminder.getDueDate());
        existingReminder.setPriority(updatedReminder.getPriority());

        if (updatedReminder.getCategory() != null) {
            Long categoryId = updatedReminder.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            existingReminder.setCategory(category);
        } else {
            existingReminder.setCategory(null);
        }
        return reminderRepository.save(existingReminder);
    }

    @Override
    public void deleteById(String username, Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        reminder.setCompleted(true);
        reminderRepository.delete(reminder);
    }
}
