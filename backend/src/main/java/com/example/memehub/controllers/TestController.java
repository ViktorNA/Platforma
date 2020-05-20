package com.example.memehub.controllers;

import com.example.memehub.entities.TestEntity;
import com.example.memehub.security.CurrentUser;
import com.example.memehub.security.UserPrincipal;
import com.example.memehub.services.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/tests")
@PreAuthorize("isAuthenticated()")
public class TestController {
  @Autowired TestService testService;

  @GetMapping
  public Set<TestEntity> getTestsOfUser(@CurrentUser UserPrincipal user){
    return testService.getAll(user);
  }

  @PostMapping
  public TestEntity saveOrUpdate(@RequestBody TestEntity testEntity, @CurrentUser UserPrincipal user) {
    return testService.saveTest(user, testEntity);
  }
}
