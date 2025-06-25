package mk.ukim.finki.remindersplus.web;
import mk.ukim.finki.remindersplus.dto.CreateReminderDto;
import mk.ukim.finki.remindersplus.dto.DisplayCategoryDto;
import mk.ukim.finki.remindersplus.dto.DisplayReminderDto;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.service.application.ReminderApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    private final ReminderApplicationService reminderApplicationService;

    public ReminderController(ReminderApplicationService reminderApplicationService) {
        this.reminderApplicationService = reminderApplicationService;
    }

    @GetMapping()
    public ResponseEntity<List<DisplayReminderDto>> getAllReminders(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(reminderApplicationService.findAllByUser(user.getUsername()));
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayReminderDto> findById(Authentication authentication,
                                                       @PathVariable Long id) {
        try {
            User user = (User) authentication.getPrincipal();
            return this.reminderApplicationService.findById(id, user.getUsername())
                    .map(c -> ResponseEntity.ok().body(c))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayReminderDto> createReminder(Authentication authentication,
                                                              @RequestBody CreateReminderDto reminderDto) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(reminderApplicationService.save(user.getUsername(), reminderDto));
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DisplayReminderDto> updateReminder(Authentication authentication,
                                                              @PathVariable Long id,
                                                              @RequestBody CreateReminderDto reminderDto) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(reminderApplicationService.update(user.getUsername(), id, reminderDto));
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}/done")
    public ResponseEntity<Void> markAsDone(Authentication authentication,
                                           @PathVariable Long id) {
        try {
            User user = (User) authentication.getPrincipal();
            if (reminderApplicationService.findById(id, user.getUsername()).isPresent()) {
                reminderApplicationService.deleteById(user.getUsername(), id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}