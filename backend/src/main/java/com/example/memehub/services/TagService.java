package com.example.memehub.services;

import com.example.memehub.dao.TagRepository;
import com.example.memehub.entities.TagEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
  @Autowired TagRepository tagRepository;

  public Page<TagEntity> getAllTags(Integer pageNo, Integer pageSize, String sortBy) {
    PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
    return tagRepository.findAll(pageRequest);
  }

  public TagEntity createTag(TagEntity tag) {
    if (tagRepository.existsByName(tag.getName()))
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tag already exist");
    return tagRepository.saveAndFlush(tag);
  }

  public List<TagEntity> findAllByName(String name) {
    return tagRepository.findAllByNameContains(name);
  }

  public TagEntity getById(Long id) {
    Optional<TagEntity> tag = tagRepository.findById(id);
    if (!tag.isPresent()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tag not found");
    return tag.get();
  }
}
