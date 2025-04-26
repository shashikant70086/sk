package com.shoppingai.smartlet.controller;

import com.shoppingai.smartlet.model.ChatSession;
import com.shoppingai.smartlet.model.Message;
import com.shoppingai.smartlet.model.User;
import com.shoppingai.smartlet.repository.ChatSessionRepository;
import com.shoppingai.smartlet.repository.MessageRepository;
import com.shoppingai.smartlet.repository.UserRepository;
import com.shoppingai.smartlet.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class SessionController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatSessionRepository chatSessionRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/sessions")
    public ResponseEntity<?> getSessions(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.getEmailFromToken(authHeader.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email).orElseThrow();
        List<ChatSession> sessions = chatSessionRepository.findAllByUser(user);

        return ResponseEntity.ok(sessions.stream().map(s -> Map.of(
                "sessionId", s.getSessionId(),
                "title", s.getTitle()
        )));
    }

    @GetMapping("/sessions/{id}")
    public ResponseEntity<?> getMessages(@PathVariable String id,
                                         @RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.getEmailFromToken(authHeader.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email).orElseThrow();
        ChatSession session = chatSessionRepository.findBySessionIdAndUser(id, user)
                .orElseThrow();

        List<Message> messages = messageRepository.findBySession(session);
        return ResponseEntity.ok(Map.of("messages", messages));
    }

}
