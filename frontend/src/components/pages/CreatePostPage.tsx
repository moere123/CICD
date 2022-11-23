import { Button, Grid, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import BlogPostService from "../../Services/BlogPostService";
import UserService from "../../Services/UserService";
import { CreatePost } from "../../types/models/CreatePost.model";
import { User } from "../../types/models/User.model";

const validationSchema = Yup.object().shape({
    title: Yup.string().max(100),
    text: Yup.string().max(1000),
    category: Yup.string().max(50),
});

const CreatePostPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: []});

    useEffect(() => {
        UserService.getUser(userId)
        .then((res) => setUser(res.data))
        .catch((error) => console.log(error));
    }, [userId])

    const paperStyle = {
        padding: 20,
        width: '50%',
        margin: '20px auto',
    };

    const buttonStyle = {
        margin: '20px 0',
    };


    const handleSubmit = (blog: CreatePost) => {
        blog.user = user;
        blog.text = blog.text ? blog.text : "";
        blog.category = blog.category ? blog.category : "";
        BlogPostService.createBlogPost(blog)
            .then(() => navigate("/"))
            .catch((error) => console.log(error));
    };


    return(
        <Grid>
            <Paper style={paperStyle}>
                <Grid>
                    <h1>Create a Post</h1>
                </Grid>
                <Formik
                    initialValues={{
                        title: '',
                        text: '',
                        category: '',
                        user: user,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                        {(props) => (
                            <Form onSubmit={props.handleSubmit}>
                                <TextField
                                    data-cy={"createPost-title"}
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

                                <TextField
                                    data-cy={"createPost-text"}
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
                                    data-cy={"createPost-category"}
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
                                data-cy={"createPost-submit"}
                                type="submit"
                                color="primary"
                                variant="contained"
                                style={buttonStyle}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                </Formik>
            </Paper>
        </Grid>
    );
}

export default CreatePostPage;