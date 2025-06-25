package mk.ukim.finki.remindersplus.dto;
import mk.ukim.finki.remindersplus.model.domain.Category;
import java.util.List;
import java.util.stream.Collectors;

public record DisplayCategoryDto(
        Long id,
        String name,
        String description,
        String username
) {
    public static DisplayCategoryDto from(Category category) {
        return new DisplayCategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getUser().getUsername()
        );
    }

    public static List<DisplayCategoryDto> from(List<Category> categories) {
        return categories.stream()
                .map(DisplayCategoryDto::from)
                .collect(Collectors.toList());
    }
}