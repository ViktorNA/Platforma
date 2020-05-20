package com.example.memehub;

import com.example.memehub.dao.RoleRepository;
import com.example.memehub.entities.RoleEntity;
import com.example.memehub.entities.RoleName;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class MemehubApplication {

  @Bean
  public ApplicationRunner defaultDataInit(RoleRepository roleRepository) {
    return args -> {
      List<RoleEntity> roles = new ArrayList<>();
      Arrays.stream(RoleName.values())
          .forEach(
              roleName -> {
                boolean isRoleInDb = roleRepository.findByName(roleName).isPresent();
                if (!isRoleInDb) roles.add(new RoleEntity(roleName));
              });
      roleRepository.saveAll(roles);
    };
  }

  public static void main(String[] args) {
    SpringApplication.run(MemehubApplication.class, args);
  }
}
