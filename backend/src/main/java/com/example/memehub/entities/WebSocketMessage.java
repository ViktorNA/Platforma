package com.example.memehub.entities;

import lombok.Data;

@Data
public class WebSocketMessage {

  private WebSocketMessageType type;
  private String socket;
  private Matrix matrix;
}
