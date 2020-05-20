package com.example.memehub.payloads;

import com.example.memehub.entities.RoleEntity;
import lombok.Data;

import java.util.Set;

@Data
public class JwtAuthenticationResponse {
  private String accessToken;
  private String tokenType = "Bearer";
  private String username;
  private Set<RoleEntity> roles;

  public JwtAuthenticationResponse(String accessToken, String username, Set<RoleEntity> roles) {
    this.accessToken = accessToken;
    this.username = username;
    this.roles = roles;
  }
}
