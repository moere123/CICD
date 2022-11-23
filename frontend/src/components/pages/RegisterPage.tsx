import { Button, Grid, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import UserService from '../../Services/UserService'
import { RegisterUser } from "../../types/models/RegisterUser.model";


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().max(255),
    lastName: Yup.string().required().max(255),
    email: Yup.string().email().required().max(255),
    password: Yup.string().required().max(255),
});

const RegisterPage = () => {
    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 400,
        margin: '20px auto',
    };

    const buttonStyle = { margin: '15px 0'};
    const navigate = useNavigate();

    const handleSubmit = (user: RegisterUser) => {
        UserService.registerUser(user).catch((error) => console.log(error));
        navigate("/login");
    };

    return(
    <Grid>
        <Paper style={paperStyle}>
            <Grid>
                <h2>Register</h2>
            </Grid>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange>
                    {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                            <TextField
                                label='First Name'
                                id='firstName'
                                placeholder="Enter first name"
                                fullWidth
                                required
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.firstName}
                            />
                            {props.errors.firstName && (
                                <div id="feedback">{props.errors.firstName}</div>
                            )}
                            
                            <TextField
                                label='Last Name'
                                id='lastName'
                                placeholder="Enter last name"
                                fullWidth
                                required
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                            />
                            {props.errors.lastName && (
                                <div id="feedback">{props.errors.lastName}</div>
                            )}

                            <TextField
                                label='E-Mail'
                                id='email'
                                placeholder="Enter email"
                                fullWidth
                                required
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                            />
                            {props.errors.email && (
                                <div id="feedback">{props.errors.email}</div>
                            )}

                            <TextField
                                label='Password'
                                id='password'
                                placeholder="Enter password"
                                type='password'
                                fullWidth
                                required
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                            />
                            {props.errors.password && (
                                <div id="feedback">{props.errors.password}</div>
                            )}

                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                style={buttonStyle}
                                fullWidth>
                                Register
                            </Button>
                        </Form>
                    )}
            </Formik>
        </Paper>
    </Grid>
    )

}

export default RegisterPage;