package mk.ukim.finki.remindersplus.service.application;
import mk.ukim.finki.remindersplus.dto.CreateCategoryDto;
import mk.ukim.finki.remindersplus.dto.DisplayCategoryDto;
import java.util.List;
import java.util.Optional;

public interface CategoryApplicationService {
    List<DisplayCategoryDto> findAll(String username);
    Optional<DisplayCategoryDto> findById(Long id, String username);
    Optional <DisplayCategoryDto> save(String username, CreateCategoryDto categoryDto);
    Optional <DisplayCategoryDto> update(Long id, String username, CreateCategoryDto categoryDto);
    void deleteById(long id, String username);
}
