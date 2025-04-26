package com.shoppingai.smartlet.controller;

import com.shoppingai.smartlet.service.GroqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PromptController {

    @Autowired
    private GroqService groqService;

    @PostMapping("/prompt")
    public ResponseEntity<?> handlePrompt(@RequestBody Map<String, String> request,
                                          @RequestHeader("Authorization") String authHeader) {
        try {
            String prompt = request.get("prompt");
            String sessionId = request.get("sessionId");
            String token = authHeader.replace("Bearer ", "");

            String reply = groqService.getGroqResponse(prompt, sessionId, token);
            return ResponseEntity.ok(Map.of("reply", reply));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to generate response"));
        }
    }
}
