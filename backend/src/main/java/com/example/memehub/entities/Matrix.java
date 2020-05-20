package com.example.memehub.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
public class Matrix {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ElementCollection private List<Double> times = new ArrayList<>();

  @OneToMany private List<TestAction> actions = new ArrayList<>();

  public void put(Double key, TestAction action) {
    times.add(key);
    actions.add(action);
  }

  public TestAction get(Double key) {
    int index = times.indexOf(key);
    if (index < 0 || index >= actions.size()) return null;
    return actions.get(index);
  }

  public ArrayList<Double> getSortedTimes() {
    ArrayList<Double> keys = new ArrayList<>(times);
    Collections.sort(keys);
    return keys;
  }
}
