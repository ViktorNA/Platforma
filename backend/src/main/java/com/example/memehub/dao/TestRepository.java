package com.example.memehub.dao;

import com.example.memehub.entities.TestEntity;
import com.example.memehub.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TestRepository extends JpaRepository<TestEntity, Long> {
    Set<TestEntity> getAllByUsersContains(UserEntity user);
}
