
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { useSelector } from 'react-redux';
import { Divider, Stack } from '@mui/material';
import { Box } from '@mui/joy';
import CommentUpdateModal from './CommentUpdateModal';
import { useState } from 'react';
import useBlogCalls from '../../hooks/useBlogCalls';

export default function CommentCard() {
  const { detail } = useSelector(state => state.blog);
  const { _id } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const { deleteComment } = useBlogCalls()
  const [commentData, setCommentData] = useState('');

  const handleOpen = (comment) => {
    setCommentData(comment);
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteComment(id)
  }

  return (
    <Stack sx={{ width: '100%' }}>
      {detail?.comments?.map((comment) => (
        <Box key={comment?._id} sx={{ mt: 2 }}>

          <Card
            invertedColors
            sx={{
              boxShadow: 'lg',
              maxWidth: '60%',
              overflow: 'auto',
              resize: 'horizontal',
              m: "auto",
              background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)",
              boxShadow: '-10px -5px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            <Typography level="h5" sx={{ fontWeight: 700 }}>
              {comment?.userId?.firstName} {comment?.userId?.lastName}
            </Typography>
            <CardContent>
              <Typography level="title-xs" sx={{ fontWeight: 200, fontSize: "12px" }}>
                Published Date: {comment?.createdAt && new Date(comment?.createdAt).toLocaleString("tr-TR")}
              </Typography>
              {comment?.updatedAt && (
                <Typography level="title-xs" sx={{ fontWeight: 200, fontSize: "12px" }}>
                  Updated Date: {new Date(comment?.updatedAt).toLocaleString("tr-TR")}
                </Typography>
              )}
              <Divider />
              <Stack level="body-md" sx={{ mt: 2, fontWeight: 500 }}>
                <Box>
                  <Typography sx={{ fontFamily: "arial" }}>{comment?.comment}</Typography>
                  {comment?.userId?._id === _id ? (
                    <CardActions>
                      <Button sx={{ width: "10%" }} variant="soft" color='success' onClick={() => handleOpen(comment)}>
                        Edit
                      </Button>

                      <Button onClick={() => handleDelete(comment)} sx={{ width: "10%" }} variant="solid" color='danger'>
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
      <CommentUpdateModal open={open} commentData={commentData} handleClose={handleClose} />
    </Stack>
  );
}
