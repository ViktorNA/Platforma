package com.example.memehub.controllers;

import com.example.memehub.entities.TagEntity;
import com.example.memehub.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
public class TagController {
  @Autowired TagService tagService;

  @GetMapping
  public Page<TagEntity> getAllTags(
      @RequestParam(defaultValue = "0") Integer pageNo,
      @RequestParam(defaultValue = "5") Integer pageSize,
      @RequestParam(defaultValue = "id") String sortBy) {
    return tagService.getAllTags(pageNo, pageSize, sortBy);
  }

  @PostMapping
  public TagEntity createTag(@RequestBody TagEntity tagEntity) {
    return tagService.createTag(tagEntity);
  }

  @GetMapping("findAllByName/{name}")
  public List<TagEntity> findAllByName(@PathVariable("name") String name) {
    return tagService.findAllByName(name);
  }

  @GetMapping("{id}")
  public TagEntity getTagById(@PathVariable Long id) {
    return tagService.getById(id);
  }
}
