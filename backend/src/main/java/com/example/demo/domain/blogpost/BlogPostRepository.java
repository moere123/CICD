package com.example.demo.domain.blogpost;

import com.example.demo.core.generic.ExtendedRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface BlogPostRepository extends ExtendedRepository<BlogPost> {
    @Query(value = "SELECT * FROM blog_post WHERE creation_time < ?1 ORDER BY creation_time LIMIT ?2", nativeQuery = true)
    List<BlogPost> findByGreaterThanCreationTimeAndWithLimit(LocalDateTime creationTime, long limit);

    @Query(value = "SELECT bp.* FROM blog_post bp WHERE bp.user_author_id = :authorId",nativeQuery = true)
    List<BlogPost> findAllByUserId(UUID authorId);
}
