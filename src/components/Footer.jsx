import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Footer = () => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: "#000010", p: 1 }}>
     <Box textAlign="center">
        <Typography variant="body2" sx={{ color: "whitesmoke" }}>
          &copy; 2024 My Blog WebSite (GY). All rights reserved.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
