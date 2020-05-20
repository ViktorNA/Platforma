package com.example.memehub.entities;

import com.example.memehub.payloads.SignUpRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 40)
  private String name;

  @NotBlank
  @Size(max = 15)
  private String username;

  @NaturalId
  @NotBlank
  @Size(max = 40)
  @Email
  private String email;

  @NotBlank
  @Size(max = 100)
  @JsonIgnore
  private String password;

  @ManyToMany(fetch = FetchType.EAGER)
  private Set<RoleEntity> roles = new HashSet<>();

  public UserEntity(SignUpRequest signUpRequest) {
    name = signUpRequest.getName();
    username = signUpRequest.getUsername();
    email = signUpRequest.getEmail();
    password = signUpRequest.getPassword();
  }

  public Boolean hasRole(RoleName roleName) {
    return roles.parallelStream().anyMatch(roleEntity -> roleEntity.getName().equals(roleName));
  }
}
