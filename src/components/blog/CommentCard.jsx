import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import { Box } from '@mui/joy';

export default function CommentCard() {
  const { detail } = useSelector(state => state.blog);
  const { _id } = useSelector(state => state.auth);

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
              <Typography level="title-xs">
                {comment.createdAt && new Date(comment.createdAt).toLocaleString("tr-TR")}
              </Typography>
              <Stack level="body-md">
                <Box>
                  <Typography>{comment.comment}</Typography>
                  {comment.userId._id === _id ? (
                    <CardActions>
                      <Button sx={{width: "10%"}} variant="outlined" color='primary'>
                        Edit
                      </Button>
                      <Button sx={{width: "10%"}} variant="solid" color='danger'>
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
    </Stack>
  );
}
