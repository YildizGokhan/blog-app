
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
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
import UpdateModal from '../components/blog/UpdateModal';

const Detail = () => {
  const [commentArea, setCommentArea] = useState(false);
  const { image, _id } = useSelector(state => state.auth)
  const { detail, categories } = useSelector(state => state.blog)

  const { getDetailBlogs, deleteBlog, postLike, getCategories } = useBlogCalls()
  const { id } = useParams()

  console.log(id)
  const handleLike = () => {
    postLike(id);
  };

  const handleComment = () => {
    setCommentArea(!commentArea);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getDetailBlogs(id);
    getCategories()
  }, [])


  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${detail?.title}?`);
    if (confirmed) {
      deleteBlog(id);
    }
  }

  return (
    <Stack sx={{
      mt: 5, justifyContent: "center", alignItems: "center",
      background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)",
    }} >
      <Card sx={{
        maxWidth: "60%", marginTop: 8,
        background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)",
        color: "black", border: "1 solid #ff3342",
        boxShadow: "-5px 4px 8px 20px rgba(0, 0, 0, 0.2)",
      }}>
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
                image={_id === detail?.userId?._id ? image : ""}
                sx={{ objectFit: "contain", }}
              />
            </Avatar>
          }
          title={detail?.title}
          subheader={new Date(detail?.createdAt).toLocaleString("tr-TR")}
        />
        <CardContent>
          <Typography variant="body2" sx={{color: "#3C3633", fontWeight: "bold", fontSize: "1.1rem"}} >
            {detail?.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5" component="div" sx={{ mt: 1, mb: 1.5, fontSize: "1.1rem", fontFamily: "Roboto, Helvetica, Arial, sans-serif;", fontWeight: "700", color: "#747264" }}>
            {detail?.content}
          </Typography>

          <hr />
          <Typography variant="body2" color="text.secondary">
            Published Date:
            {new Date(detail?.createdAt).toLocaleString("tr-TR")}
          </Typography>
          { }
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
      {detail?.userId?._id?.includes(_id) ? (
        <CardActions sx={{ m: 2 }}>
          <Button sx={{ width: "10%", m: 2, backgroundColor: "#9DBC98" }} variant="contained" color='success' onClick={handleOpen}>
            Edit
          </Button>
          <Button sx={{ width: "10%", backgroundColor: "#BF3131" }} variant="contained" color='error'
            onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>

      ) : ""}
      <UpdateModal open={open} handleClose={handleClose} categories={categories} />
    </Stack>
  );
}

export default Detail;