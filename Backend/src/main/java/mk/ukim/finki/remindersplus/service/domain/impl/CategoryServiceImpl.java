package mk.ukim.finki.remindersplus.service.domain.impl;
import jakarta.persistence.EntityNotFoundException;
import mk.ukim.finki.remindersplus.model.domain.Category;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.repository.CategoryRepository;
import mk.ukim.finki.remindersplus.repository.UserRepository;
import mk.ukim.finki.remindersplus.service.domain.CategoryService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Category> findAll(String username) {
        return categoryRepository.findByUserUsername(username);
    }

    @Override
    public Optional<Category> findById(Long id, String username) {
        return categoryRepository.findByIdAndUserUsername(id, username);
    }

    @Override
    public Optional<Category> save(String username, Category category) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new EntityNotFoundException("User not found: " + username);
        }
        category.setUser(userOptional.get());
        return Optional.of(categoryRepository.save(category));
    }

    @Override
    public Optional<Category> update(Long id, String username, Category category) {
        return categoryRepository.findByIdAndUserUsername(id, username).map(existingCategory -> {
            if (category.getName() != null) {
                existingCategory.setName(category.getName());
            }
            if (category.getDescription() != null) {
                existingCategory.setDescription(category.getDescription());
            }
            return categoryRepository.save(existingCategory);
        });
    }

    @Override
    public void deleteById(long id, String username) {
        Optional<Category> categoryOptional = categoryRepository.findByIdAndUserUsername(id, username);
        categoryOptional.ifPresent(categoryRepository::delete);
    }
}