import React from 'react';
import { useLocation } from 'react-router-dom';
import CommentForm from '../components/blog/CommentForm';
import { Stack } from '@mui/material';

const Detail = () => {

  const location = useLocation();
  const { blog } = location.state;

  return (
    <Stack sx={{mt: 5, justifyContent: "center", alignItems: "center"}} >
      {blog && <CommentForm blog={blog} />}
    </Stack>
  );
}

export default Detail;
