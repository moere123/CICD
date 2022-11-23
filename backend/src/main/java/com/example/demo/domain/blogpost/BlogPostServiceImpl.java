package com.example.demo.domain.blogpost;

import com.example.demo.core.generic.ExtendedRepository;
import com.example.demo.core.generic.ExtendedServiceImpl;
import com.example.demo.domain.role.Role;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import com.example.demo.domain.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Service
public class BlogPostServiceImpl extends ExtendedServiceImpl<BlogPost> implements BlogPostService {
    private final UserService userService;

    @Autowired
    protected BlogPostServiceImpl(ExtendedRepository<BlogPost> repository, Logger logger, UserService userService) {
        super(repository, logger);
        this.userService = userService;
    }

    @Override
    public BlogPost expandedSave(BlogPost post) {
        post.setUser(userService.getCurrentUser());
        post.setCreationTime(LocalDateTime.now());
        return save(post);
    }

    @Override
    public List<BlogPost> findAllWithLimitAfterId(UUID blogId, long limit) {
        BlogPost post = findById(blogId);

        log.debug("Attempting to find Entries following Id {} with limit {}", blogId, limit);
        List<BlogPost> foundItems = ((BlogPostRepository) repository).findByGreaterThanCreationTimeAndWithLimit(post.getCreationTime(), limit);
        log.debug("Successfully found Entries following Id {} with limit {}", blogId, limit);
        return foundItems;
    }

    @Override
    public List<BlogPost> findAllByUserId(UUID userId) {
        log.info("Attempting to find all Entries from Author with Id {}", userId);
        List<BlogPost> foundItems = ((BlogPostRepository) repository).findAllByUserId(userId);
        log.info("Successfully found all Entries from Author with Id {}", userId);
        return foundItems;
    }

    public BlogPost expandedUpdateById(UUID id, BlogPost updatedPost) {
        BlogPost toUpdate = findById(id);
        updatedPost.setUser(toUpdate.getUser());
        updatedPost.setCreationTime(toUpdate.getCreationTime());


        updatedPost.setEditTime(LocalDateTime.now());

        return updateById(id, updatedPost);
    }
}
