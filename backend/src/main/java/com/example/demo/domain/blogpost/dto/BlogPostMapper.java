package com.example.demo.domain.blogpost.dto;

import com.example.demo.core.generic.ExtendedMapper;
import com.example.demo.domain.blogpost.BlogPost;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlogPostMapper extends ExtendedMapper<BlogPost, BlogPostDTO> {}
