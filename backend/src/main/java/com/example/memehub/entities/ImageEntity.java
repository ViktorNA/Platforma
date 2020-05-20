package com.example.memehub.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@Table(name = "images")
public class ImageEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String imageUrl;

  @ManyToOne @JsonIgnore private UserEntity user;

  @ManyToMany(fetch = FetchType.EAGER)
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Set<TagEntity> tags = new HashSet<>();

  public ImageEntity(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public Boolean isImageContainsTag(Long tagId) {
    return this.tags.parallelStream().anyMatch(tagEntity -> tagEntity.getId().equals(tagId));
  }

  public Boolean isImageContainsTags(Long[] tags) {
    for (Long tagId : tags) {
      if (!isImageContainsTag(tagId)) return false;
    }
    return true;
  }

  public void removeTag(Long tagId) {
    tags =
        tags.parallelStream()
            .filter(tagEntity -> !tagEntity.getId().equals(tagId))
            .collect(Collectors.toSet());
  }
}
