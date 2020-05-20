package com.example.memehub.dao;

import com.example.memehub.entities.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
  Boolean existsByName(String name);

  List<TagEntity> findAllByNameContains(String name);
}
