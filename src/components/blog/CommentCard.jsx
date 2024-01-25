
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import { Box } from '@mui/joy';
import CommentUpdateModal from './CommentUpdateModal';
import Comment from '@mui/icons-material/Comment';
import useBlogCalls from '../../hooks/useBlogCalls';
import { useEffect, useState } from 'react';

export default function CommentCard() {
  const { detail } = useSelector(state => state.blog);
  const { _id } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const { getSingleComments } = useBlogCalls()
  const [commentId, setCommentId] = useState('');


  const handleOpen = (commentId) => {
    setCommentId(commentId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Stack sx={{ width: '100%' }}>
      {detail?.comments?.map((comment) => (
        <Box key={comment._id} sx={{ mt: 2 }}>
          
          <Card
            invertedColors
            sx={{
              boxShadow: 'lg',
              maxWidth: '60%',
              overflow: 'auto',
              resize: 'horizontal',
              m: "auto",
            }}
          >
            <Typography level="h4">
              {comment.userId.firstName} {comment.userId.lastName}
            </Typography>
            <CardContent>
              <Typography level="title-xs" sx={{ fontWeight: 200, fontSize: "12px" }}>
                Published Date: {comment.createdAt && new Date(comment.createdAt).toLocaleString("tr-TR")}
              </Typography>
              <Stack level="body-md" sx={{ mt: 2, fontWeight: 700 }}>
                <Box>
                  <Typography>{comment.comment}</Typography>
                  {comment.userId._id === _id ? (
                    <CardActions>
                      <Button sx={{ width: "10%" }} variant="outlined" color='primary' onClick={() => handleOpen(comment._id)}>
                        Edit
                      </Button>

                      <Button sx={{ width: "10%" }} variant="solid" color='danger'>
                        Delete
                      </Button>
                    </CardActions>
                  ) : (
                    ""
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>

        </Box>

      ))}
      <CommentUpdateModal open={open} commentId={commentId} handleClose={handleClose} />
    </Stack>
  );
}
