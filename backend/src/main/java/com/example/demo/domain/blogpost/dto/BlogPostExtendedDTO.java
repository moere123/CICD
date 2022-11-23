package com.example.demo.domain.blogpost.dto;

import com.example.demo.domain.user.dto.UserDTO;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * This DTO extends the basic one with author, creationTime and editTime
 *
 * Mainly used to send to the FrontEnd
 */
public class BlogPostExtendedDTO extends BlogPostDTO {

    private LocalDateTime creationTime;

    private LocalDateTime editTime;

    private UserDTO user;

    public BlogPostExtendedDTO() {}

    public BlogPostExtendedDTO(UUID id, String title, String text, String category, UserDTO user, LocalDateTime creationTime, LocalDateTime editTime) {
        super(id, title, text, category);
        this.user = user;
        this.creationTime = creationTime;
        this.editTime = editTime;
    }

    public void setCreationTime(LocalDateTime creationTime) {this.creationTime = creationTime;}
    public void setEditTime(LocalDateTime editTime) {this.editTime = editTime;}
    public void setUser(UserDTO user) {this.user = user;}

    public LocalDateTime getCreationTime() {return creationTime;}
    public LocalDateTime getEditTime() {return editTime;}
    public UserDTO getUser() {return user;}
}
