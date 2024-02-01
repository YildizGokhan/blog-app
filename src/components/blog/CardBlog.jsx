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
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useBlogCalls from '../../hooks/useBlogCalls';
import { useSelector } from 'react-redux';

export default function CardBlog({ blog }) {
  const navigate = useNavigate();
  const { postLike } = useBlogCalls();
  const { _id } = useSelector((state) => state.auth);

  const handleLike = () => {
    postLike(blog?._id, true);
  };

  return (
    <Card sx={{
      maxWidth: "100%", maxHeight: 500, display: 'flex', flexDirection: 'column', marginRight: 5, borderRadius: 5,
      backgroundImage: "linear-gradient( 135deg, #E8D07A 10%, #5312D6 100%)",
      border: 1, borderColor: "#5312D6", borderStyle: "solid", padding: 1,
      boxShadow: '-10px -5px 20px rgba(0, 0, 0, 0.8)',
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>

        <CardMedia component="img" alt={blog?.title} image={blog?.image} sx={{ width: "33%", height: "100%", margin: "auto" }} />
        <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', pl: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {blog?.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              flex: '1',
            }}
          >
            {blog?.content}
          </Typography>

          <hr />
          <Typography variant="body2" color="text.secondary">
            Published Date: {new Date(blog?.createdAt).toLocaleString('tr-TR')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated Date: {new Date(blog?.updatedAt).toLocaleString('tr-TR')}
          </Typography>

        </CardContent>
      </Box>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon color={blog?.likes?.includes(_id) ? 'error' : ''} />
            <Typography>{blog?.likes?.length}</Typography>
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon />
            <Typography>{blog?.comments?.length}</Typography>
          </IconButton>
          <IconButton aria-label="visible">
            <VisibilityIcon />
            <Typography>{blog?.countOfVisitors}</Typography>
          </IconButton>
        </Box>

        <Button
          variant="contained"
          sx={{
            color: '#EBD9B4',
            borderRadius: 5,
            backgroundColor: "#5312D6",
            cursor: 'pointer',
            "&:hover": { background: "darkslateblue", color: "white", transform: "scale(1.1)" },
          }}
          onClick={() => {
            navigate(`/detail/${blog?._id}`);
          }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>

  );
}
