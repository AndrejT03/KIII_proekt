package mk.ukim.finki.remindersplus.dto;
import mk.ukim.finki.remindersplus.model.domain.User;
import mk.ukim.finki.remindersplus.model.enumerations.Role;
import mk.ukim.finki.remindersplus.model.exceptions.InvalidArgumentsException;

public record CreateUserDto(
        String username,
        String password,
        String repeatPassword,
        String name,
        String surname,
        Role role
) {

    public CreateUserDto {
        if (username == null || username.isBlank()) {
            throw new InvalidArgumentsException("Username cannot be empty");
        }
        if (password == null || password.isBlank()) {
            throw new InvalidArgumentsException("Password cannot be empty");
        }
        if (!password.equals(repeatPassword)) {
            throw new InvalidArgumentsException("Passwords do not match");
        }
    }

    public User toUser() {
        return new User(username, password, name, surname, role);
    }
}