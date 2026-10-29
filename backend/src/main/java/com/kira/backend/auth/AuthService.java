package com.kira.backend.auth;

import com.kira.backend.security.TokenService;
import com.kira.backend.user.User;
import com.kira.backend.user.UserRepository;
import com.kira.backend.user.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder, TokenService tokenService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request){
        String email = request.email().toLowerCase();

        if(userRepository.existsByEmail(email)){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        if(userRepository.existsByUsername(request.username())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is already used");
        }

        String password = passwordEncoder.encode(request.password());
        User user = new User(request.username(), email, password);

        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> invalidCredentials());

        if(passwordEncoder.matches(request.password(), user.getPasswordHash())){
            throw invalidCredentials();
        }

        String token = tokenService.createToken(user);
        return new LoginResponse(token, "Bearer", tokenService.getExpirationSeconds());
    }

    private ResponseStatusException invalidCredentials(){
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
    }
}
