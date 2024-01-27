import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import { useNavigate } from 'react-router-dom';

const MyBlog = () => {
  const { myblogs } = useSelector((state) => state.blog);
  const { getUserBlogs, postLike, getDetailBlogs } = useBlogCalls();
  const { _id } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getUserBlogs(_id);
  }, [_id]);

  const handleLike = (blogId) => {
    postLike(blogId);
  };


  return (
    <Grid container gap={3} mt={1} justifyContent={"center"} sx={{ backgroundColor: "#f5f5f5", marginBottom: 5 }}>
      {myblogs.map((myblog) => (
        <Grid item key={myblog?._id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={myblog?.title}
              height="140"
              image={myblog?.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {myblog?.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                {myblog?.content}
              </Typography>

              <hr />
              <Typography variant="body2" color="text.secondary">
                Published Date: {new Date(myblog?.createdAt).toLocaleString('tr-TR')}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
              <Box>
                <IconButton onClick={() => handleLike(myblog?._id)} aria-label="add to favorites">
                  <FavoriteIcon
                    color={myblog?.likes?.includes(_id) ? 'error' : ''}
                  />
                  <Typography>{myblog?.likes?.length}</Typography>
                </IconButton>
                <IconButton aria-label="comment">
                  <CommentIcon />
                  <Typography>{myblog?.comments?.length}</Typography>
                </IconButton>
                <IconButton aria-label="visible">
                  <VisibilityIcon />
                  <Typography>{myblog?.countOfVisitors}</Typography>
                </IconButton>
              </Box>

              <Button
                onClick={() => {
                  getDetailBlogs(myblog?._id)
                  navigate(`/detail/${myblog?._id}`, { state : {myblog}})
                  } }
                variant="contained"
                sx={{
                  color: 'cyan',
                  backgroundColor: 'black',
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'darkslateblue',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Read More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyBlog;
