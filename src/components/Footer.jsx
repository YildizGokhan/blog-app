import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Footer = () => {
  return (
    <Paper position="static" sx={{ backgroundColor: "#000010",  p: 4  }}>
      <Box textAlign="center">
        <Typography variant="body2" sx={{color: "whitesmoke"}}>
          &copy; 2024 My Blog WebSite (GY). All rights reserved.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
