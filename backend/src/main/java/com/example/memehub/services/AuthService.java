package com.example.memehub.services;

import com.example.memehub.dao.RoleRepository;
import com.example.memehub.dao.UserRepository;
import com.example.memehub.entities.RoleEntity;
import com.example.memehub.entities.RoleName;
import com.example.memehub.entities.UserEntity;
import com.example.memehub.payloads.JwtAuthenticationResponse;
import com.example.memehub.payloads.LoginRequest;
import com.example.memehub.payloads.SignUpRequest;
import com.example.memehub.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthService {
  private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
  @Autowired AuthenticationManager authenticationManager;

  @Autowired UserRepository userRepository;

  @Autowired RoleRepository roleRepository;

  @Autowired PasswordEncoder passwordEncoder;

  @Autowired JwtTokenProvider tokenProvider;

  public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);
    UserEntity user =
        userRepository.findByUsernameOrEmail(
            loginRequest.getUsernameOrEmail(), loginRequest.getUsernameOrEmail()).get();
    return new JwtAuthenticationResponse(jwt, user.getUsername(), user.getRoles());
  }

  public JwtAuthenticationResponse registerUser(SignUpRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      logger.error("Username is already exist");
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is already exist");
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      logger.error("Email is already in use");
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already in use");
    }

    UserEntity user = new UserEntity(signUpRequest);

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    RoleEntity userRole =
        roleRepository
            .findByName(RoleName.USER)
            .orElseThrow(() -> new RuntimeException("User Role not set."));

    user.setRoles(Collections.singleton(userRole));

    UserEntity result = userRepository.saveAndFlush(user);

    LoginRequest loginRequest = new LoginRequest(result.getUsername(), signUpRequest.getPassword());
    return authenticateUser(loginRequest);
  }

  public Boolean isEmailAvailable(String email) {
    return !userRepository.existsByEmail(email);
  }

  public Boolean isUsernameAvailable(String username) {
    return !userRepository.existsByUsername(username);
  }
}
