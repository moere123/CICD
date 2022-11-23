package com.example.demo.core.security.permissionEvaluators;

import com.example.demo.domain.role.Role;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Log4j2
public class UserPermissionEvaluator {
    @Autowired
    private UserService service;

    public boolean isUserAccessable(User user, String accessingUserId) {
        // If user is Admin, is automatically granted
        if (user.getRoles().stream().anyMatch((Role role) -> "ADMIN".equals(role.getName()))) {
            return true;
        } else {
            return UUID.fromString(accessingUserId).equals(user.getId());
        }
    }
}
