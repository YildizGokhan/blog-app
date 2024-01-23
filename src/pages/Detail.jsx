
import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import { CardActions } from '@mui/joy';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, CardHeader } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CommentForm from '../components/blog/CommentForm';
import useBlogCalls from '../hooks/useBlogCalls';
import CommentCard from '../components/blog/CommentCard';

const Detail = () => {
  const [commentArea, setCommentArea] = useState(false);
  const { image } = useSelector(state => state.auth)
  const { getDetailBlogs } = useBlogCalls()
  const location = useLocation();
  const { detail } = useSelector(state => state.blog)
  const { blog } = location.state;
  console.log("detail", detail);
  const { postLike } = useBlogCalls()
  const { _id } = useSelector(state => state.auth);

  const handleLike = () => {
    if (detail?.likes?.includes(_id)) {   
      postLike(blog?._id);
      getDetailBlogs(blog._id);
    } else {
      postLike(blog?._id);
      getDetailBlogs(blog._id);
    }
  };


  const handleComment = () => {
    setCommentArea(!commentArea);
  }

  useEffect(() => {
    getDetailBlogs(blog._id)
  }, [])

  return (
    <Stack sx={{ mt: 5, justifyContent: "center", alignItems: "center" }} >
      <Card sx={{ maxWidth: "60%" }}>
        <CardMedia
          component="img"
          alt={detail?.title}
          height="50%"
          image={detail?.image}
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
          title={detail?.title}
          subheader={new Date(detail?.createdAt).toLocaleString("tr-TR")}
        />
        <CardContent>
          <Typography variant="body2" >
            {detail?.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5" component="div" sx={{ mt: 1, mb: 1.5, fontSize: "0.8rem", fontFamily: "Roboto, Helvetica, Arial, sans-serif;", fontWeight: "400" }}>
            {detail?.content}
          </Typography>

          <hr />
          <Typography variant="body2" color="text.secondary">
            Published Date:
            {new Date(detail?.createdAt).toLocaleString("tr-TR")}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={handleLike} aria-label="add to favorites">
              <FavoriteIcon color={detail?.likes?.includes(_id) ? "error" : ""} />
              <Typography>
                {detail?.likes?.length}
              </Typography>
            </IconButton>
            <IconButton aria-label="comment" onClick={handleComment}>
              <CommentIcon />
              <Typography>
                {detail?.comments?.length}
              </Typography>
            </IconButton>
            <IconButton aria-label="visible">
              <VisibilityIcon />
              <Typography>
                {detail?.countOfVisitors}
              </Typography>
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      {commentArea && (
        <>
          <CommentForm />
          <CommentCard />
        </>
      )}
    </Stack>
  );
}

export default Detail;