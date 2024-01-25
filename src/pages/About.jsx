import React from "react";
import {
  Card,
  Typography,
  Button,
  Box,
  Link,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Email,
} from "@mui/icons-material";
import Footer from "../components/Footer";

const listItemButtonStyle = {
  "&:hover": {
    backgroundColor: "primary.light",
  },
  width: "5%",
};

const About = () => {
  return (
    <Stack sx={{ mt: 5, minHeight: "80vh" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, py: 4 }}>
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
                  <Link
                    href="https://www.linkedin.com/in/gokhan-a-yildiz-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-black"
                    sx={{
                      textDecoration: "none",
                      color: "lightblue",
                      "&:hover": {
                        color: "aquamarine",
                      },
                    }}
                  >
                    Contact
                  </Link>
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
