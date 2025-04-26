package com.shoppingai.smartlet.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ChatSession {
    @Id
    private String sessionId;

    @ManyToOne
    private User user;

    private String title;

}
