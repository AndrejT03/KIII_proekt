package mk.ukim.finki.remindersplus.repository;
import mk.ukim.finki.remindersplus.model.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserUsername(String username);
    Optional<Category> findByIdAndUserUsername(Long id, String username);
}