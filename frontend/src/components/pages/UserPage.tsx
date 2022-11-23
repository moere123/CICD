import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogPostService from "../../Services/BlogPostService";
import UserService from "../../Services/UserService";
import { BlogPost } from "../../types/models/BlogPost.model";
import { User } from '../../types/models/User.model';
import BlogCard from "../molecules/BlogCard/BlogCard";
import Header from "../molecules/Header/Header";


const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<User>();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    const removePostFromBlogs = (id : string) => {
        setBlogs(blogs.filter((blogElement) => blogElement.id !== id));
      }

    useEffect(() => {
        UserService.getUser(userId)
        .then((res) => setUser(res.data))
        .catch((error) => console.log(error));
    }, [userId])

    useEffect(() => {
        BlogPostService.getAllByUser(userId).then((res) => setBlogs(res.data)).catch((error) => console.log(error));
    }, [userId]);

    return(
        <div>
            <Header/>
            <Typography sx={{fontSize: 'h2.fontSize', ml: 10}}>Welcome back, {user?.firstName}</Typography>
            <Typography sx={{fontSize: 'h2.fontSize', ml: 10}}>My Blog Posts</Typography>
            {blogs.length > 0 ? 
                blogs.map((blog) => {
                    return(
                        <BlogCard
                            removePostFromBlogs={removePostFromBlogs}
                            key={blog.id}
                            blogPost={blog}
                        />
                    );
                })
                : <Typography>No blog posts yet</Typography>    
            }
        </div>
    );
}

export default UserPage;