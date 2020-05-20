package com.example.memehub.controllers;

import com.example.memehub.entities.UserEntity;
import com.example.memehub.entities.WebSocketMessage;
import com.example.memehub.security.CurrentUser;
import com.example.memehub.security.UserPrincipal;
import com.sun.org.apache.xpath.internal.operations.String;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {
  @Autowired SimpMessagingTemplate messagingTemplate;

  @GetMapping("api/socketGet")
  public void getSocketMess(@CurrentUser UserPrincipal user) {
    messagingTemplate.convertAndSend(
            "/topic/socket" + user.getUsername(), "From getMapping");
  }

  @MessageMapping("/userSocket")
  public void greeting(WebSocketMessage message) throws Exception {
    messagingTemplate.convertAndSend(
        "/topic/socket" + message.getSocket(), message);
  }
}
