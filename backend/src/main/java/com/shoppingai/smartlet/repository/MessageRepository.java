package com.shoppingai.smartlet.repository;

import com.shoppingai.smartlet.model.ChatSession;
import com.shoppingai.smartlet.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySession(ChatSession session);
    List<Message> findBySessionOrderByIdAsc(ChatSession session);
}