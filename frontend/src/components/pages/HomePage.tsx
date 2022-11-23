import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BlogPostService from '../../Services/BlogPostService';
import { BlogPost } from '../../types/models/BlogPost.model';
import BlogCard from '../molecules/BlogCard/BlogCard';
import Header from '../molecules/Header/Header';

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [postPerPage, setPostPerPage] = useState<number>(5);

  const removePostFromBlogs = (id : string) => {
    setBlogs(blogs.filter((blogElement) => blogElement.id !== id));
  }

  useEffect(() => {
    BlogPostService.getAllFromPageWithLimitBlogPosts(postPerPage, page)
      .then((res) => {setBlogs(res.data);})
  }, [page]);

  return (
    <div>
      <Header/>
      <Typography sx={{ml: 10, fontSize: 'h2.fontSize'}}>Blogs</Typography>
      
      {
        Array.isArray(blogs) && blogs.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              blogPost={blog}
              removePostFromBlogs={removePostFromBlogs}
            />
          )
        })
      }
      <Button onClick={() => setPage(page - 1)}>{"<"}</Button>
      {page}
      <Button onClick={() => setPage(page + 1)}>{">"}</Button>
    </div>
  );
}
