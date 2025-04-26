package com.shoppingai.smartlet.controller;

import com.shoppingai.smartlet.dto.AuthRequest;
import com.shoppingai.smartlet.dto.AuthResponse;
import com.shoppingai.smartlet.model.User;
import com.shoppingai.smartlet.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        return ResponseEntity.ok(authService.login(req.email, req.password));
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody User user) {
        return ResponseEntity.ok(authService.signUp(user));
    }
}