package mk.ukim.finki.remindersplus.service.domain;
import mk.ukim.finki.remindersplus.model.domain.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> findAll(String username);
    Optional<Category> findById(Long id, String username);
    Optional <Category> save(String username, Category category);
    Optional <Category> update(Long id, String username, Category category);
    void deleteById(long id, String username);
}
