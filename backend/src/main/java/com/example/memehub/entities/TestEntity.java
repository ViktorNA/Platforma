package com.example.memehub.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class TestEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private TestType testType;
  private double duration;

  @OneToOne private Matrix matrix;

  @ManyToMany @JsonIgnore private List<UserEntity> users;

  @ElementCollection private List<Double> graph;
}
