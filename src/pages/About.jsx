import React from "react";
import { Card, Typography, Button, Box, Link, Avatar, Grid, List, ListItem, ListItemButton, Stack, } from "@mui/material";
import {Facebook,Instagram,LinkedIn,Email,} from "@mui/icons-material";



const About = () => {
  return (
    <Stack sx={{
      mt: 8, minHeight: "100vh",
      background: 'radial-gradient(circle, rgba(236, 240, 220, 1) 3%, rgba(201, 208, 117, 0.9753151260504201) 99%)',
    }}>
      <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
        <Grid item xs={12} md={7}>
          <Card sx={{
            p: 3, py: 4,
            background: 'radial-gradient(circle, rgba(236, 240, 220, 1) 3%, rgba(201, 208, 117, 0.9753151260504201) 99%)',
          }}>
            <Box display="flex" justifyContent="center">
              <Avatar
                src="https://i.hizliresim.com/6f8brbh.png"
                width={100}
                sx={{ width: 100, height: 100, borderRadius: "50%" }}
                alt="ab"
              />
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" sx={{ bg: "secondary.main", p: 1, px: 2, borderRadius: 1, color: "white" }}>
                Pro
              </Typography>
              <Typography variant="h5" mt={2} mb={0}>
                Gökhan YILDIZ
              </Typography>
              <Typography variant="body2">FrontEnd Developer</Typography>

              <List className="social-list" sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", mt: 2 }}>
                <ListItem sx={{ width: "5%" }} >
                  <ListItemButton target="_blank" component={Link} href="#" color="inherit">
                    <Facebook color="primary" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ width: "5%" }} >
                  <ListItemButton component={Link} href="https://www.instagram.com/gyildizz" color="inherit" target="_blank"
                  >
                    <Instagram sx={{ color: "#C13584", "&:hover": { color: "#A13584" } }} />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ width: "5%" }} >
                  <ListItemButton component={Link} href="https://www.linkedin.com/in/gyildizz/" color="inherit" target="_blank">
                    <LinkedIn color="primary" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ width: "5%" }} >
                  <ListItemButton component={Link} href="https://www.google.com.tr/?hl=tr" color="inherit" target="_blank">
                    <Email color="info" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Box className="buttons" mt={2}>
                <Button variant="contained" color="primary" sx={{ px: 4 }}>
                  <a
                    href={'mailto:gygokhanyildiz1@gmail.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-black"
                    style={{
                      textDecoration: "none",
                      color: "lightblue",
                      "&:hover": {
                        color: "aquamarine",
                      },
                      display: "inline-block",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Contact
                  </a>
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

    </Stack>
  );
};

export default About;
