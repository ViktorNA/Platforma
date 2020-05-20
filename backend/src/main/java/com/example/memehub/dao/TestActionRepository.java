package com.example.memehub.dao;

import com.example.memehub.entities.TestAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestActionRepository extends JpaRepository<TestAction, Long> {
}
