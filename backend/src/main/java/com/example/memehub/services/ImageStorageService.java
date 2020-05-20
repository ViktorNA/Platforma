package com.example.memehub.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageStorageService {

  @Value("${app.fileBaseUrl}")
  private String fileBasePath;

  public String uploadFileToStorage(MultipartFile file) {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    Path path = Paths.get(fileBasePath + fileName);
    try {
      File directory = new File(fileBasePath);
      if (!directory.exists()) {
        directory.mkdirs();
      }
      Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/api/images/")
        .path(fileName)
        .toUriString();
  }

  public Resource downloadFileFromStorage(String fileName, HttpServletResponse response) {
    Path path = Paths.get(fileBasePath + fileName);
    Resource resource = null;
    try {
      resource = new UrlResource(path.toUri());
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }
    if (resource == null || !resource.exists())
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");

    response.setHeader(
        HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
    response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
    return resource;
  }
}
