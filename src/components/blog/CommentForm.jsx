import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, CardHeader } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentArea from './CommentArea';


export default function CommentForm() {
  const { image } = useSelector(state => state.auth);
  const location = useLocation();
  const blog = location.state?.blog;
  const [commentArea, setCommentArea] = React.useState(false);

  const handleComment = () => {
    setCommentArea(!commentArea);
  }


  return (
    <>
      <Card sx={{ maxWidth: "60%" }}>
        <CardMedia
          component="img"
          alt=""
          height="50%"
          image={blog?.image}
          sx={{ objectFit: "contain" }}
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
              <CardMedia
                component="img"
                alt=""
                height="140"
                image={image ? image : ""}
                sx={{ objectFit: "contain" }}
              />
            </Avatar>
          }
          title={blog?.title}
          subheader={new Date(blog?.createdAt).toLocaleString("tr-TR")}
        />
        <CardContent>
          <Typography variant="body2" >
            {blog.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5" component="div" sx={{ mt: 1, mb: 1.5, fontSize: "0.8rem", fontFamily: "Roboto, Helvetica, Arial, sans-serif;", fontWeight: "400" }}>
            {blog?.content}
          </Typography>

          <hr />
          <Typography variant="body2" color="text.secondary">
            Published Date:
            {new Date(blog?.createdAt).toLocaleString("tr-TR")}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <Box>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon onClick={handleComment} />
            </IconButton>
            <IconButton aria-label="visible">
              <VisibilityIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      {commentArea && <CommentArea />}
    </>
  );
}
