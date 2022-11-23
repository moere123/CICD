import { Route, Routes } from 'react-router-dom';
import CreatePostPage from '../components/pages/CreatePostPage';
import EditPostPage from '../components/pages/EditPostPage';
import EditUserPage from '../components/pages/EditUserPage';
import HomePage from '../components/pages/HomePage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import UserPage from '../components/pages/UserPage';
import UsersPage from '../components/pages/UsersPage';
import authorities from '../config/Authorities';
import PrivateRoute from './PrivateRoute';

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<RegisterPage />} />

      <Route
        path={'/:userId/post'}
        element={
          <PrivateRoute authorities={[{id: "", name: authorities.BLOGPOST_CREATE}]} element={<CreatePostPage />} />
        }
      />
      <Route
        path={'/:userId/:blogPostId/edit'}
        element={
          <PrivateRoute authorities={[{id: "", name: authorities.BLOGPOST_UPDATE}]} element={<EditPostPage/>} />
        }
      />
      <Route
        path={'/:userId/edit'}
        element={
          <PrivateRoute authorities={[{id: "", name: authorities.USER_READ_ALL}]} element={<EditUserPage/>} />
        }
      />
      <Route
        path={'/users'}
        element={
          <PrivateRoute authorities={[{id: "", name: authorities.USER_READ_ALL}]} element={<UsersPage/>} />
        }
      />
      <Route
        path='/users/:userId'
        element={
          <PrivateRoute
            authorities={[{id: "", name: authorities.USER_READ}]}
            element={<UserPage/>}
          ></PrivateRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
