package com.example.demo.core.exception;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<HashMap<String, String>> customFallthroughHandler(NoSuchElementException e) {
    return responseEntity(e);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<HashMap<String, String>> customFallthroughHandler(Exception e) {
    return responseEntity(e);
  }

  private ResponseEntity<HashMap<String, String>> responseEntity(Exception e) {
    HashMap<String, String> map = new HashMap<>();

    map.put("time", LocalDateTime.now().toString());
    map.put("message", e.getMessage());
    map.put("stacktrace", Arrays.toString(e.getStackTrace()));
    map.put("cause", e.getCause().toString());

    return ResponseEntity.status(400).body(map);
  }
}


