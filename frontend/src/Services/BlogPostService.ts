import api from '../config/Api';
import { BlogPost } from '../types/models/BlogPost.model';
import { CreatePost } from '../types/models/CreatePost.model';

const BlogPostService = {
    createBlogPost: (blog: CreatePost) => {
        return api.post(`/blog/create`, blog);
    },
    getAllBlogPosts: () => {
        return api.get(`/blog/`);
    },
    getAllFromPageWithLimitBlogPosts: (limit : number, page : number) => {
        return api.get(`/blog/page?limit=${limit}&page=${page}`);
    },
    getAllAfterIdWithLimitBlogPosts: (limit : number, id : string) => {
        return api.get(`/blog/${id}?limit=${limit}`);
    },
    getAllByUser: (userId : string|undefined) => {
        return api.get(`/blog/user/${userId}`);
    },
    getBlogPost: (id : string|undefined) => {
        return api.get(`/blog/${id}`);
    },
    updateBlogPost: (id : string, blogPost : BlogPost) => {
        return api.put(`/blog/${id}`, {...blogPost});
    },
    deleteBlogPost: (id : string) => {
        return api.delete(`/blog/${id}`);
    },
}

export default BlogPostService;