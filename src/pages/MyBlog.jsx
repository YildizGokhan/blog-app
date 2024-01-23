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
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';

const MyBlog = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const { detail, blogs } = useSelector((state) => state.blog);
  const { getBlogs, getDetailBlogs } = useBlogCalls();
  const { _id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (formData) {
      getBlogs();
      // Eğer status 'Draft' ise sadece detayları al, ama tüm blogları almasına gerek yok
      if (formData.isPublish !== false) {
        getDetailBlogs(formData?.categoryId);
      }
    }
  }, [formData]);

  if (!formData) {
    return (
      <div>
        <p>No blog data found!</p>
      </div>
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={formData?.title}
        height="140"
        image={formData?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {formData?.title}
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
          {formData?.content}
        </Typography>

        <hr />
        <Typography variant="body2" color="text.secondary">
          Published Date: {new Date(formData?.createdAt).toLocaleString('tr-TR')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon
              color={formData?.likes?.includes(_id) ? 'error' : ''}
            />
            <Typography>{formData?.likes?.length}</Typography>
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon />
            <Typography>{formData?.comments?.length}</Typography>
          </IconButton>
          <IconButton aria-label="visible">
            <VisibilityIcon />
            <Typography>{formData?.countOfVisitors}</Typography>
          </IconButton>
        </Box>

        <Button
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
  );
};

export default MyBlog;
