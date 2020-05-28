package com.example.memehub.services;

import com.example.memehub.dao.MatrixRepository;
import com.example.memehub.dao.TestActionRepository;
import com.example.memehub.dao.TestRepository;
import com.example.memehub.dao.UserRepository;
import com.example.memehub.entities.Matrix;
import com.example.memehub.entities.TestAction;
import com.example.memehub.entities.TestEntity;
import com.example.memehub.entities.UserEntity;
import com.example.memehub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TestService {
  @Autowired TestRepository testRepository;
  @Autowired UserRepository userRepository;
  @Autowired
  MatrixRepository matrixRepository;
  @Autowired
  TestActionRepository testActionRepository;

  public TestEntity saveTest(UserPrincipal user, TestEntity test) {
    List<UserEntity> userEntities = new ArrayList<>();
    Optional<UserEntity> userEntity = userRepository.findById(user.getId());
    if (!userEntity.isPresent())
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not exist");
    userEntities.add(userEntity.get());
    test.setUsers(userEntities);
    List<TestAction> savedActions = testActionRepository.saveAll(test.getMatrix().getActions());
    test.getMatrix().setActions(savedActions);
    Matrix savedMatrix = matrixRepository.save(test.getMatrix());
    test.setMatrix(savedMatrix);
    return testRepository.save(test);
  }

  public Set<TestEntity> getAll(UserPrincipal user) {
    Optional<UserEntity> userEntity = userRepository.findById(user.getId());
    if (!userEntity.isPresent())
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not exist");
    return testRepository.getAllByUsersContains(userEntity.get());
  }
}
