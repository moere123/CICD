import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import BlogPostService from '../../../Services/BlogPostService';
import { BlogPost } from '../../../types/models/BlogPost.model';

type Props = {
  blogPost: BlogPost,
  removePostFromBlogs : Function,
};


const BlogCard = ({blogPost, removePostFromBlogs}: Props) => {
  const navigate = useNavigate();
  const { user, checkRole } = useContext(ActiveUserContext);

  const subheader = blogPost.creationTime ? moment(blogPost.creationTime).format("DD.MM.YYYY hh:mm") : "" 
    + blogPost.editTime ? "Edited : " + moment(blogPost.editTime).format("DD-MM-YYYY hh:mm") : "";

  return (
    <Card sx={{ maxWidth: '35%', mb: 10, ml: 10 }} data-cy={blogPost.title} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">OG</Avatar>
        }
        title={blogPost.user ? blogPost.user.firstName + " " + blogPost.user.lastName : "anonymous"}
        subheader={subheader}
      />
      <CardContent>
        <Typography variant="h6">
           {blogPost.title + (blogPost.category !== "" ? ` - ${blogPost.category}` : "")}
           <hr />
        </Typography>
        <Typography variant="body2">
           {blogPost.text}
        </Typography>
      </CardContent>
      <CardActions>
        {
          checkRole("ADMIN") || user?.id === blogPost.user.id ?
            <>
              <Button data-cy={blogPost.title + "-delete"} variant="outlined" color="error" onClick={() => {BlogPostService.deleteBlogPost(blogPost.id); removePostFromBlogs(blogPost.id);}} > Delete </Button>
              <Button data-cy={blogPost.title + "-edit"} variant="outlined" color="success" onClick={() => navigate(`/${ user?.id }/${ blogPost.id }/edit`) } > Edit </Button>
            </> : <></>
        }
        
      </CardActions>
    </Card>
  );
}

export default BlogCard;
