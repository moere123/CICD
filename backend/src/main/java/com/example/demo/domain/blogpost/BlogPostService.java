package com.example.demo.domain.blogpost;

import com.example.demo.core.generic.ExtendedService;

import java.util.List;
import java.util.UUID;

public interface BlogPostService extends ExtendedService<BlogPost> {
    BlogPost expandedSave(BlogPost post);


    List<BlogPost> findAllByUserId(UUID authorId);

    /**
     * This Function gets a limited amount of Posts, which have been created before a given Post
     *
     * @param blogId The id from which it should get all
     * @param limit the Limit of Posts to get
     * @return A list with the found posts
     */
    List<BlogPost> findAllWithLimitAfterId(UUID blogId, long limit);

    BlogPost expandedUpdateById(UUID id, BlogPost post);
}
