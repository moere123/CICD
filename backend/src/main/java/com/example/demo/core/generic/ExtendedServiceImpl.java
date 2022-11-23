package com.example.demo.core.generic;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public abstract class ExtendedServiceImpl<T extends ExtendedEntity> implements ExtendedService<T> {

  protected final ExtendedRepository<T> repository;
  protected final Logger logger;
  private String className;

  protected ExtendedServiceImpl(ExtendedRepository<T> repository, Logger logger) {
    this.repository = repository;
    this.logger = logger;
    initClassName();
  }

  private void initClassName() {
    try {
      this.className = Class.forName(((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0].getTypeName()).getSimpleName();
    } catch (ClassNotFoundException e) {
      this.className = ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0].getTypeName();
    }
  }
  @Override
  public T save(T entity) {
    return repository.save(entity);
  }

  @Override
  public Void deleteById(UUID id) throws NoSuchElementException {
    logger.debug("Attempting to delete {} with ID '{}'", singleEntityName(), id);
    if (repository.existsById(id)) {
      logger.debug("Deleting {} with ID '{}'", singleEntityName(), id);
      repository.deleteById(id);
    } else {
      logger.debug("{} with ID '{}' was not deleted", singleEntityName(), id);
      throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
    }
    return null;
  }

  @Override
  public T updateById(UUID id, T entity) throws NoSuchElementException {
    logger.debug("Attempting to update {} with ID '{}'", singleEntityName(), id);
    if (repository.existsById(id)) {
      entity.setId(id);
      logger.debug("Updated {} with ID '{}'", singleEntityName(), id);
      return repository.save(entity);
    } else {
      logger.debug("{} with ID '{}' was not updated", singleEntityName(), id);
      throw new NoSuchElementException(String.format("Entity with ID '%s' could not be found", id));
    }
  }

  @Override
  public List<T> findAll() {
    logger.debug("Attempting to find all {}", multipleEntitiesName());

    List<T> entities = repository.findAll();

    logger.debug("Found all {}", multipleEntitiesName());

    return entities;
  }

  @Override
  public List<T> findAll(Pageable pageable) {
    Page<T> pagedResult = repository.findAll(pageable);
    return pagedResult.hasContent() ? pagedResult.getContent() : new ArrayList<T>();
  }

  @Override
  public T findById(UUID id) {
    logger.debug("Attempting to find {} with ID '{}'", singleEntityName(), id);

    Optional<T> optional = repository.findById(id);

    if (optional.isPresent()) {
      T entity = optional.get();

      logger.debug("Found {} with ID '{}'", singleEntityName(), id);

      return entity;
    } else {
      logger.debug("Nothing found with ID '{}'", id);
      throw new NoSuchElementException("No value present");
    }
    //return findOrThrow(repository.findById(id));
  }

  @Override
  public boolean existsById(UUID id) {
    logger.debug("Attempting to see if {} with ID '{}' exists", singleEntityName(), id);

    if (repository.existsById(id)) {
      logger.debug("{} with ID '{}' exists", singleEntityName(), id);
      return true;
    } else {
      logger.debug("{} with ID '{}' does not exist", singleEntityName(), id);
      return false;
    }
    //return repository.existsById(id);
  }

  @Override
  public T findOrThrow(Optional<T> optional) throws NoSuchElementException {
    if (optional.isPresent()) {
      return optional.get();
    } else {
      throw new NoSuchElementException("No value present");
    }
  }

  protected final String singleEntityName() {
    return className;
  }

  protected final String multipleEntitiesName() {
    if (className.endsWith("y")) {
      return className.substring(0, className.length() - 1) + "ies";
    } else {
      return className + "s";
    }
  }
}
