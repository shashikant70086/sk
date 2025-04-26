package com.shoppingai.smartlet.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.shoppingai.smartlet.model.ChatSession;
import com.shoppingai.smartlet.model.Message;
import com.shoppingai.smartlet.model.User;
import com.shoppingai.smartlet.repository.ChatSessionRepository;
import com.shoppingai.smartlet.repository.MessageRepository;
import com.shoppingai.smartlet.repository.UserRepository;
import com.shoppingai.smartlet.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.List;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String MODEL = "gemma2-9b-it";

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Autowired
    private ChatSessionRepository chatSessionRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String getGroqResponse(String prompt, String sessionId, String token) throws Exception {
        String email = jwtUtil.getEmailFromToken(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        ChatSession session = chatSessionRepository.findById(sessionId)
                .orElseGet(() -> {
                    ChatSession s = new ChatSession();
                    s.setSessionId(sessionId);
                    s.setUser(user);
                    s.setTitle("Session " + sessionId.substring(0, 5));
                    return chatSessionRepository.save(s);
                });

        // Save user message first
        Message userMessage = new Message();
        userMessage.setRole("user");
        userMessage.setContent(prompt);
        userMessage.setSession(session);
        messageRepository.save(userMessage);

        // Call Groq with full history
        List<Message> history = messageRepository.findBySessionOrderByIdAsc(session);
        String reply = callGroq(history);

        // Save bot message
        Message botMessage = new Message();
        botMessage.setRole("assistant");
        botMessage.setContent(reply);
        botMessage.setSession(session);
        messageRepository.save(botMessage);

        return reply;
    }

    public String callGroq(List<Message> history) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        ObjectNode root = mapper.createObjectNode();
        root.put("model", MODEL);
        root.put("max_tokens", 150);
        root.put("temperature", 0.7);

        ArrayNode messages = mapper.createArrayNode();

        // Add system prompt
        ObjectNode systemMsg = mapper.createObjectNode();
        systemMsg.put("role", "system");
        systemMsg.put("content", "You are a helpful AI shopping assistant. Only respond to shopping-related queries like buying clothes, shoes, electronics, etc. If the user asks something else, kindly ask them to focus on shopping.");
        messages.add(systemMsg);

        // Add message history
        for (Message msg : history) {
            ObjectNode msgNode = mapper.createObjectNode();
            msgNode.put("role", msg.getRole());
            msgNode.put("content", msg.getContent());
            messages.add(msgNode);
        }

        root.set("messages", messages);

        String requestBody = mapper.writeValueAsString(root);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        String body = response.body();

        System.out.println("Request Body: " + requestBody);
        System.out.println("Response: " + body);

        try {
            int contentIndex = body.indexOf("\"content\":\"");
            if (contentIndex == -1) return "[No reply received]";
            int start = contentIndex + 11;
            int end = body.indexOf("\"", start);
            if (end == -1) return "[Malformed response]";
            return body.substring(start, end).replace("\\n", "\n");
        } catch (Exception e) {
            return "[Error parsing response]";
        }
    }
}
