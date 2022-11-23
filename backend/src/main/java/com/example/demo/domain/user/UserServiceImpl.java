package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.role.Role;
import com.example.demo.domain.role.RoleRepository;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@Log4j2
public class UserServiceImpl extends ExtendedServiceImpl<User> implements UserService {

  private final PasswordEncoder passwordEncoder;
  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  public UserServiceImpl(UserRepository repository, Logger logger, PasswordEncoder passwordEncoder) {
    super(repository, logger);
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email)
                                        .map(UserDetailsImpl::new)
                                        .orElseThrow(() -> new UsernameNotFoundException(email));
  }

  @Override
  public User register(User user) {
    log.info("Attempting to register a new user");
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    Optional<Role> userRole = roleRepository.findById(UUID.fromString("d29e709c-0ff1-4f4c-a7ef-09f656c390f1"));
    if (userRole.isEmpty()) {
      log.info("Role with ID: d29e709c-0ff1-4f4c-a7ef-09f656c390f1 was not found");
    } else {
      log.info("Assigning USER Role to new user");
      user.setRoles(Set.of(userRole.get()));
    }
    log.info("New User created");
    return save(user);
  }

  @Override
  public User getByEmail(String email) {
    return ((UserRepository) repository).findByEmail(email).orElseThrow();
  }

  public User getCurrentUser() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return getByEmail(auth.getName());
  }
}
