package mk.ukim.finki.remindersplus.service.application;
import mk.ukim.finki.remindersplus.dto.*;
import java.util.Optional;

public interface UserApplicationService {
    Optional<DisplayUserDto> register(CreateUserDto createUserDto);

    Optional<LoginResponseDto> login(LoginUserDto loginUserDto);

    Optional<DisplayUserDto> findByUsername(String username);

}