package com.shoppingai.smartlet.repository;

import com.shoppingai.smartlet.model.ChatSession;
import com.shoppingai.smartlet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, String> {
    List<ChatSession> findAllByUser(User user);
    Optional<ChatSession> findBySessionIdAndUser(String sessionId, User user);
}
