import React from 'react';
import { useLocation } from 'react-router-dom';
import CommentForm from '../components/blog/CommentForm';
import { Stack } from '@mui/material';

const Detail = () => {
  // useLocation hook'u ile location bilgisini al
  const location = useLocation();
  const { blog } = location.state;

  return (
    <Stack sx={{mt: 5, justifyContent: "center", alignItems: "center"}} >
      {/* Eğer blog bilgisi varsa CommentForm'a geçir */}
      {blog && <CommentForm blog={blog} />}
    </Stack>
  );
}

export default Detail;
