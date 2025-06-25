package mk.ukim.finki.remindersplus.dto;
import mk.ukim.finki.remindersplus.model.domain.Category;

public record CreateCategoryDto(
        String name,
        String description
) {
    public Category toCategory() {
        return new Category(
                name,
                description
        );
    }
}