package mk.ukim.finki.remindersplus.service.application.impl;
import mk.ukim.finki.remindersplus.dto.CreateReminderDto;
import mk.ukim.finki.remindersplus.dto.DisplayReminderDto;
import mk.ukim.finki.remindersplus.model.domain.Category;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.service.application.ReminderApplicationService;
import mk.ukim.finki.remindersplus.service.domain.CategoryService;
import mk.ukim.finki.remindersplus.service.domain.ReminderService;
import mk.ukim.finki.remindersplus.service.domain.UserService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReminderApplicationServiceImpl implements ReminderApplicationService {
    private final ReminderService reminderService;
    private final CategoryService categoryService;
    private final UserService userService;

    public ReminderApplicationServiceImpl(ReminderService reminderService, CategoryService categoryService, UserService userService) {
        this.reminderService = reminderService;
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @Override
    public List<DisplayReminderDto> findAllByUser(String username) {
        return reminderService.findAll(username).stream()
                .map(DisplayReminderDto::from).toList();
    }

    @Override
    public Optional<DisplayReminderDto> findById(Long id, String username) {
        return reminderService.findById(id, username).map(DisplayReminderDto::from);
    }

    @Override
    public DisplayReminderDto save(String username, CreateReminderDto reminderDto) {
        Optional<Category> category = categoryService.findById(reminderDto.categoryId(), username);
        if (reminderDto.categoryId() != null) {
            User user = userService.findByUsername(username);
            return DisplayReminderDto.from(reminderService.save(username, reminderDto.toReminder(user, category.get())));
        }
        return null;
    }

    @Override
    public DisplayReminderDto update(String username, Long id, CreateReminderDto reminderDto) {
        Optional<Category> category = categoryService.findById(reminderDto.categoryId(), username);
        User user = userService.findByUsername(username);
        return DisplayReminderDto.from(reminderService.update(username, id, reminderDto.toReminder(user, category.get())));
    }

    @Override
    public void deleteById(String username, Long id) {
        reminderService.deleteById(username, id);
    }
}
