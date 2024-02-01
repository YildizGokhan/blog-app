import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { Typography, Button, Stack } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for might be in another castle.
      </Typography>
      <Button onClick={handleGoBack} variant="contained" color="primary">
        Go Back
      </Button>
      <Button onClick={handleGoHome} variant="contained" color="primary">
        Go Home
      </Button>
    </Stack>
  );
};

export default NotFound;
