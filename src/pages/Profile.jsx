import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

export default function Profile() {
  const { image, bio, email, user } = useSelector((state) => state.auth);

  return (
    <Stack sx={{
     background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)", height: "100vh"
    }}>
      <Card sx={{
        maxWidth: 400, margin: 'auto', marginTop: 15, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.0)',
        background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)",
      }}>
        <CardMedia
          component="img"
          alt={user}
          height="200"
          image={image}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent sx={{ padding: 2, textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>User:</span> {user}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
            <span style={{ fontWeight: 'bold' }}>Email:</span> {email}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
            <span style={{ fontWeight: 'bold' }}>My Bio:</span> {bio}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
