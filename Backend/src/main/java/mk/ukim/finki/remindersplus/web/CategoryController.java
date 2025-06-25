package mk.ukim.finki.remindersplus.web;
import mk.ukim.finki.remindersplus.dto.CreateCategoryDto;
import mk.ukim.finki.remindersplus.dto.DisplayCategoryDto;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.service.application.CategoryApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryApplicationService categoryService;

    public CategoryController(CategoryApplicationService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public ResponseEntity<List<DisplayCategoryDto>> findAll(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(categoryService.findAll(user.getUsername()));
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayCategoryDto> findById(Authentication authentication,
                                                       @PathVariable Long id) {
        try {
            User user = (User) authentication.getPrincipal();
            return this.categoryService.findById(id, user.getUsername())
                    .map(c -> ResponseEntity.ok().body(c))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayCategoryDto> save(Authentication authentication,
                                                   @RequestBody CreateCategoryDto categoryDto) {
        try {
            User user = (User) authentication.getPrincipal();
            return this.categoryService.save(user.getUsername(), categoryDto)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DisplayCategoryDto> update(Authentication authentication,
                                                     @PathVariable Long id,
                                                     @RequestBody CreateCategoryDto categoryDto) {
        try {
            User user = (User) authentication.getPrincipal();
            return this.categoryService.update(id, user.getUsername(), categoryDto)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(Authentication authentication, @PathVariable Long id) {
        try {
            User user = (User) authentication.getPrincipal();
            if (categoryService.findById(id, user.getUsername()).isPresent()) {
                categoryService.deleteById(id, user.getUsername());
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            exception.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}