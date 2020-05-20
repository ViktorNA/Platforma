package com.example.memehub.dao;

import com.example.memehub.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

  Optional<UserEntity> findByUsernameOrEmail(String username, String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}
