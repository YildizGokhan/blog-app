import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import useAuthCalls from "../hooks/useAuthCalls";
import { Stack } from "@mui/material";

const defaultTheme = createTheme();

export default function Login() {
  const { login } = useAuthCalls()

  return (
    <ThemeProvider theme={defaultTheme}>
    <Stack sx={{ background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)", height: "100vh"}}>
      <Container component="main" maxWidth="xs" sx={{
      boxShadow: '-10px -5px 20px rgba(0, 0, 0, 0.8)',height: "50vh", margin: "auto", marginTop: 15}}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <LoginForm {...props} />}
          >
          </Formik>
        </Box>
      </Container>
      </Stack>
    </ThemeProvider>
  );
}