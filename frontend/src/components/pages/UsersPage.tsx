import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { User } from '../../types/models/User.model';
import Header from "../molecules/Header/Header";


const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const textStyle = {
        fontSize: 24
    }

    useEffect(() => {
        UserService.getAllUsers().then((res) => setUsers(res.data))
        .catch((error) => console.log(error));
    }, []);


    const deleteUser = (id: string) => {
        UserService.deleteUser(id);
        window.location.reload();
    };


    return(
        <div>
            <Header/>
            <Container>
            {users.map((user: User) => {
                return(
                    <Card key={user.id} sx={{ mb: 10, maxWidth: "50%", mx: 'auto'}}>
                        <CardContent>
                            <Typography sx={textStyle}>First Name: {user.firstName}</Typography>
                            <Typography sx={textStyle}>Last Name: {user.lastName}</Typography>
                            <Typography sx={textStyle}>E-Mail: {user.email}</Typography>
                            {user.roles.length > 0 ?
                                user.roles.map((role) => {
                                    return (
                                        <Typography sx={textStyle}>Role: {role.name}</Typography>
                                    );
                                })
                                : <></>
                            }
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="error" onClick={() => deleteUser(user.id)}>
                                Delete
                            </Button>
                            <Button variant="outlined" color="success" onClick={() => navigate(`/${user.id}/edit`)}>
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                );
            })}
            </Container>
        </div>
    );
}

export default UsersPage;