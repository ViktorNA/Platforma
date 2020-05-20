package com.example.memehub.services;

import com.example.memehub.entities.WebSocketMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    public void messageHandler(SimpMessagingTemplate messagingTemplate, WebSocketMessage message) {
        switch (message.getType()){
            case DEVICE_REQUEST: {

            }
        }
    }

}
