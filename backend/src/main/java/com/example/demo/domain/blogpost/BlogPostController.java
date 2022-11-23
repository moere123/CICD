package com.example.demo.domain.blogpost;

import com.example.demo.domain.blogpost.dto.BlogPostDTO;
import com.example.demo.domain.blogpost.dto.BlogPostExtendedDTO;
import com.example.demo.domain.blogpost.dto.BlogPostExtendedMapper;
import com.example.demo.domain.blogpost.dto.BlogPostMapper;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.List;
import java.util.UUID;

@RequestMapping("/blog")
@Controller
public class BlogPostController {

    private final BlogPostService service;
    private final BlogPostMapper blogPostMapper;
    private final BlogPostExtendedMapper blogPostExtendedMapper;

    @Autowired
    public BlogPostController(BlogPostService service, BlogPostMapper blogPostMapper, BlogPostExtendedMapper blogPostExtendedMapper) {
        this.service = service;
        this.blogPostMapper = blogPostMapper;
        this.blogPostExtendedMapper = blogPostExtendedMapper;
    }

    /**
     * Creates a new BlogPost Entry in the DataBase
     * @param blogPostDTO The Post to create
     * @return a BlogPostExtendedDTO with the data of the created object
     */
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('BLOGPOST_CREATE')")
    @Operation(description = "This Method creates a new BlogPost")
    public ResponseEntity<BlogPostExtendedDTO> createBlog(@Valid @RequestBody BlogPostDTO blogPostDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogPostExtendedMapper.toDTO(service.expandedSave(blogPostMapper.fromDTO(blogPostDTO))));
    }

    /**
     * @return all BlogPosts
     */
    @GetMapping("")
    @Operation(description = "This Method returns all BlogPosts")
    public ResponseEntity<List<BlogPostExtendedDTO>> getAll() {
        return ResponseEntity.ok(service.findAll().stream().map(blogPostExtendedMapper::toDTO).toList());
    }

    /**
     * @param page The Page to get
     * @param limit The amount of BlogPosts to get
     * @return a limited amount of BlogPosts in the given Range
     */
    @GetMapping("/page")
    @Operation(description = "This Method returns the BlogPosts from a given Page with a given amount (limit)")
    public ResponseEntity<List<BlogPostExtendedDTO>> getAllWithPageAndLimit(@PathParam("page") int page, @PathParam("limit") int limit) {
        return ResponseEntity.ok(service.findAll(Pageable.ofSize(limit).withPage(page)).stream().map(blogPostExtendedMapper::toDTO).toList());
    }

    /**
     * This Function gets a limited amount of BlogPosts, which have been created before a given BlogPost.
     * Doesn't include/return the given BlogPost
     *
     * @param blogId The ID of the given BlogPost
     * @param limit The amount of BlogPosts to get
     * @return a limited amount of BlogPosts, created before a given BlogPost
     */
    @GetMapping("/{blogId}/getNext")
    @Operation(description = "This Method returns the BlogPosts with a given amount (limit), starting from a given BlogPost-ID")
    public ResponseEntity<List<BlogPostExtendedDTO>> getAllWithLimitAfterId(@PathVariable("blogId") String blogId, @PathParam("limit") long limit) {
        return ResponseEntity.ok(service.findAllWithLimitAfterId(UUID.fromString(blogId), limit).stream().map(blogPostExtendedMapper::toDTO).toList());
    }

    /**
     *
     * This functions retrieves all the BlogPosts made by the user
     *
     * @param userId The Author of the Post
     * @return all BlogPosts which belong to a User
     */
    @GetMapping("/user/{userId}")
    @Operation(description = "This Method returns the BlogPosts which belong to a User")
    public ResponseEntity<List<BlogPostExtendedDTO>> findAllByUserId(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(service.findAllByUserId(UUID.fromString(userId)).stream().map(blogPostExtendedMapper::toDTO).toList());
    }

    /**
     * @param blogId The ID of a BlogPost
     * @return the whole BlogPost
     */
    @GetMapping("/{blogId}")
    @Operation(description = "This Method returns a specified BlogPost")
    public ResponseEntity<BlogPostExtendedDTO> getBlog(@PathVariable("blogId") String blogId) {
        return ResponseEntity.ok(blogPostExtendedMapper.toDTO(service.findById(UUID.fromString(blogId))));
    }

    /**
     * @param blogId The ID of a blogPost
     * @param blogPost The BlogPost, to which it should be updated
     * @return The updated BlogPost
     */
    @PutMapping("/{blogId}")
    @PreAuthorize("hasAuthority('BLOGPOST_UPDATE') && @blogPostPermissionEvaluator.isPostForUser(authentication.principal.user, #blogId)")
    @Operation(description = "This Method updates a BlogPost")
    public ResponseEntity<BlogPostExtendedDTO> updateBlog(@PathVariable("blogId") String blogId, @Valid @RequestBody BlogPostDTO blogPost) {
        return ResponseEntity.ok(blogPostExtendedMapper.toDTO(service.expandedUpdateById(UUID.fromString(blogId), blogPostMapper.fromDTO(blogPost))));
    }

    /**
     * @param blogId The BlogPost to delete
     * @return void
     */
    @DeleteMapping("/{blogId}")
    @PreAuthorize("hasAuthority('BLOGPOST_DELETE') && @blogPostPermissionEvaluator.isPostForUser(authentication.principal.user, #blogId)")
    @Operation(description = "This Method deletes a BlogPost")
    public ResponseEntity<Void> deleteById(@PathVariable("blogId") String blogId) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(service.deleteById(UUID.fromString(blogId)));
    }
}
