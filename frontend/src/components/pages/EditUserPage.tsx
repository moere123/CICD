import { Button, Grid, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import UserService from "../../Services/UserService";
import { User } from "../../types/models/User.model";


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().max(255),
    lastName: Yup.string().required().max(255),
    email: Yup.string().email().required().max(255),
});


const EditUserPage = () => {
    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 400,
        margin: '20px auto',
    };
    const buttonStyle = { margin: '15px 0'};
    const navigate = useNavigate();
    const { userId } = useParams();
    const [ user, setUser ] = useState<User>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
    });
    const initialValues = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
    }

    useEffect(() => {
        UserService.getUser(userId).then((res) => setUser(res.data));
    }, [userId]);

    const handleSubmit = (user: User) => {
        UserService.updateUser(user)
            .then(() => {navigate('/')})
            .catch((error) => console.log(error));
    };

    return (
        <Grid>
        <Paper style={paperStyle}>
            <Grid>
                <h2>Edit account</h2>
            </Grid>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
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

                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                style={buttonStyle}
                                fullWidth>
                                Edit
                            </Button>
                        </Form>
                    )}
            </Formik>
        </Paper>
    </Grid>
    );
}

export default EditUserPage;