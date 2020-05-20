package com.example.memehub.controllers;

import com.example.memehub.payloads.JwtAuthenticationResponse;
import com.example.memehub.payloads.LoginRequest;
import com.example.memehub.payloads.SignUpRequest;
import com.example.memehub.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@PreAuthorize("permitAll()")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired AuthService authService;

  @PostMapping("signIn")
  public JwtAuthenticationResponse signIn(@Valid @RequestBody LoginRequest loginRequest) {
    return authService.authenticateUser(loginRequest);
  }

  @PostMapping("signUp")
  public JwtAuthenticationResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
    return authService.registerUser(signUpRequest);
  }

  @GetMapping("isEmailAvailable")
  public Boolean isEmailAvailable(@RequestParam String email) {
    return authService.isEmailAvailable(email);
  }

  @GetMapping("isUsernameAvailable")
  public Boolean isUsernameAvailable(@RequestParam String username) {
    return authService.isUsernameAvailable(username);
  }
}
