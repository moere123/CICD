import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';


const Header = () => {
    const navigate = useNavigate();
    const { user, checkRole, logout } = useContext(ActiveUserContext);
    const buttonStyle = {
        mr: 5
    };


    return (
            <Box>
                <AppBar position="static">
                    <Toolbar sx={{backgroundColor: "black"}}>          
                    <Button variant="outlined" sx={buttonStyle} onClick={() => navigate('/')}>Home</Button>
                    {checkRole("ADMIN") && <Button variant="outlined" sx={buttonStyle} onClick={() => navigate('/users')}>Users</Button>}
                    {checkRole("USER") && <Button variant="outlined" sx={buttonStyle} onClick={() => navigate(`/users/${user?.id}`)}>Account</Button>}
                    {checkRole("ADMIN") && <Button variant="outlined" sx={buttonStyle} onClick={() => navigate('/register')}>Create New User</Button>}
                    {checkRole("USER") && <Button data-cy={"header-create-post"} variant="outlined" sx={buttonStyle} onClick={() => navigate(`/${user?.id}/post`)}>Create Post</Button>}
                    {
                    user ?
                        <Button variant="outlined" sx={buttonStyle} onClick={() => {logout(); navigate(`/`);}}>Logout</Button>
                        :
                        <>
                        <Button variant="outlined" sx={buttonStyle} onClick={() => {navigate(`/register`);}}>Register</Button>
                        <Button variant="outlined" sx={buttonStyle} onClick={() => {navigate(`/login`);}}>Login</Button>
                        </>
                    }
                    </Toolbar> 
                </AppBar> 
            </Box>
    );
}

export default Header;