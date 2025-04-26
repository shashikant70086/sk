package com.shoppingai.smartlet.service;

import com.shoppingai.smartlet.dto.AuthResponse;
import com.shoppingai.smartlet.model.User;
import com.shoppingai.smartlet.repository.UserRepository;
import com.shoppingai.smartlet.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user);
        return new AuthResponse("Login successful", token);
    }

    public AuthResponse signUp(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already taken");
        }
        userRepository.save(user);
        String token = jwtUtil.generateToken(user);
        return new AuthResponse("Signup successful", token);
    }
}
