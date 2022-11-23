package com.example.demo.domain.blogpost.dto;

import com.example.demo.core.generic.ExtendedDTO;

import java.util.UUID;

/**
 * This is the basic DTO without author, creationTime and editTime
 *
 * Mainly used to get from the FrontEnd
 */
public class BlogPostDTO extends ExtendedDTO {

    private String title;

    private String text;

    private String category;

    public BlogPostDTO() {}

    public BlogPostDTO(UUID id, String title, String text, String category) {
        super(id);
        this.title = title;
        this.text = text;
        this.category = category;
    }

    public void setTitle(String title) {this.title = title;}
    public void setText(String text) {this.text = text;}
    public void setCategory(String category) {this.category = category;}

    public String getTitle() {return title;}
    public String getText() {return text;}
    public String getCategory() {return category;}
}
