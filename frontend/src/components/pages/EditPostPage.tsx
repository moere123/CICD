import { Button, Grid, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import BlogPostService from "../../Services/BlogPostService";
import UserService from "../../Services/UserService";
import { BlogPost } from "../../types/models/BlogPost.model";
import { User } from "../../types/models/User.model";


const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(100),
    text: Yup.string().max(1000),
    category: Yup.string().max(50),
});


const EditPostPage = () => {
    const { userId } = useParams();
    const { blogPostId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: []});

    const [blogPost, setBlogPost] = useState<BlogPost>({
        id: '',
        title: '',
        text: '',
        category: '',
        user: {id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],},
        creationTime: undefined,
        editTime: undefined,
    });

    useEffect(() => {
        UserService.getUser(userId)
        .then((res) => setUser(res.data))
        .catch((error) => console.log(error));
    }, [userId])

    useEffect(() => {
        BlogPostService.getBlogPost(blogPostId).then((res) => setBlogPost(res.data));
    }, [blogPostId]);

    const paperStyle = {
        padding: 20,
        width: '50%',
        margin: '20px auto',
    };

    const buttonStyle = {
        margin: '20px 0',
    };

    const initialValues = {
        id: blogPost.id,
    title: blogPost.title,
    text: blogPost.text,
    category: blogPost.category,
    user: blogPost.user,
    creationTime: blogPost.creationTime,
    editTime: blogPost.editTime,
    }

    const handleSubmit = (blog: BlogPost) => {
        blog.user = user;
        blog.text = blog.text ? blog.text : "";
        blog.category = blog.category ? blog.category : "";
        BlogPostService.updateBlogPost(blog.id, blog)
            .then(() => {navigate('/')});
    };

return (
    <Grid>
            <Paper style={paperStyle}>
                <Grid>
                    <h1>Update a Post</h1>
                </Grid>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validationSchema={validationSchema}>
                        {(props) => (
                            <Form onSubmit={props.handleSubmit}>
                                <TextField
                                    data-cy={"editPost-title"}
                                    label='Title'
                                    id='title'
                                    placeholder="Enter title"
                                    fullWidth
                                    sx={{ mb: '10px' }}
                                    required
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                />
                                {props.errors.title && (
                                    <div id="feedback">{props.errors.title}</div>
                                )}

                                <TextField
                                    data-cy={"editPost-text"}
                                    label='Text'
                                    id='text'
                                    placeholder="Enter text"
                                    fullWidth
                                    sx={{ mb: '10px' }}
                                    required
                                    multiline
                                    rows={5}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.text}
                                />

                                <TextField
                                    data-cy={"editPost-category"}
                                    label='Category'
                                    id='category'
                                    placeholder="Enter category"
                                    fullWidth
                                    sx={{ mb: '10px' }}
                                    required
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.category}
                                />

                                <Button
                                    data-cy={"editPost-submit"}
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    style={buttonStyle}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                </Formik>
            </Paper>
        </Grid>
);
}

export default EditPostPage;