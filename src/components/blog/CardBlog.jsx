import * as React from 'react';
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
import { Box, Stack } from '@mui/material';

export default function CardBlog({ blog }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={blog?.title}
        height="140"
        image={blog?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog?.content.split('\n').slice(0, 1).join('\n')}
        </Typography>

        <hr />
        <Typography variant="body2" color="text.secondary">
          Published Date: {new Date(blog?.createdAt).toLocaleString("tr-TR")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="visible">
            <VisibilityIcon />
          </IconButton>
        </Box>

        <Button variant="contained" sx={{ color: "cyan", backgroundColor: "black", cursor: "pointer", "&:hover": {background: "darkslateblue", color: "white", transform: "scale(1.1)"}}} >Read More</Button>
      </CardActions>
    </Card>
  );
}
