package mk.ukim.finki.remindersplus.service.application.impl;
import mk.ukim.finki.remindersplus.dto.CreateCategoryDto;
import mk.ukim.finki.remindersplus.dto.DisplayCategoryDto;
import mk.ukim.finki.remindersplus.service.application.CategoryApplicationService;
import mk.ukim.finki.remindersplus.service.domain.CategoryService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryApplicationServiceImpl implements CategoryApplicationService {
    private final CategoryService categoryService;

    public CategoryApplicationServiceImpl(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public List<DisplayCategoryDto> findAll(String username) {
        return DisplayCategoryDto.from(categoryService.findAll(username));
    }

    @Override
    public Optional<DisplayCategoryDto> findById(Long id, String username) {
        return categoryService.findById(id, username).map(DisplayCategoryDto::from);
    }

    @Override
    public Optional<DisplayCategoryDto> save(String username, CreateCategoryDto categoryDto) {
        return categoryService.save(username, categoryDto.toCategory()).map(DisplayCategoryDto::from);
    }

    @Override
    public Optional<DisplayCategoryDto> update(Long id, String username, CreateCategoryDto categoryDto) {
        return categoryService.update(id, username, categoryDto.toCategory()).map(DisplayCategoryDto::from);
    }

    @Override
    public void deleteById(long id, String username) {
        categoryService.deleteById(id, username);
    }
}
