import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import bloglogo from "../assets/bloglogo.jpeg"
import { Stack } from "@mui/material";


const pages = [
  {
    id: 1,
    title: "Dashboard",
    url: "/",
  },
  {
    id: 2,
    title: "New Blog",
    url: "/new-blog",
  },
  {
    id: 3,
    title: "About",
    url: "/about",
  },
];

const settings = [
  {
    id: 1,
    title: "My Blogs",
    url: "/my-blogs",
  },
  {
    id: 2,
    title: "Profile",
    url: "/profile",
  },
  {
    id: 3,
    title: "Logout",
    url: "/",
  },
];

function Navbar() {
  const { user, image } = useSelector((state) => state.auth);

  const { logout } = useAuthCalls();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  return (
    <AppBar
  
      sx={{
        backgroundColor: "#000010",
        width: "100%",
      }}
    >
    
      <Container maxWidth="100%" >
        <Toolbar disableGutters>
        
          <Box
            component="a"
            href="/"
            sx={{
              height: 50,
              width: 50,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 50, md: 50 },
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              borderRadius: "50%",
            }}
          >
            <img
              alt="logo"
              src={bloglogo}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Stack
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <MenuIcon sx={{ fontSize: 32, }} onClick={handleOpenNavMenu} />
              <Box
                component="a"
                href="/"
                sx={{
                  height: 85,
                  width: 85,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 120, md: 50 },
                  display: { xs: "flex", md: "none" },
                  borderRadius: "50%",
                }}
              >
                <img
                  alt="logo"
                  src={bloglogo}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
              <Typography></Typography>
            </Stack>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.url);
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.url);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                settings.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(setting.url);
                    }}
                  >
                    <Typography
                      textAlign="center"
                      onClick={() => setting.title === "Logout" && logout()}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;