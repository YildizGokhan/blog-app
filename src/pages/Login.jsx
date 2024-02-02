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
    <Stack sx={{ background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,232,29,0.5803571428571428) 50%, rgba(252,176,69,1) 100%)", height: "100vh"}}>
      <Container component="main" maxWidth="xs" sx={{ border: 1, borderColor: "#5312D6", borderStyle: "solid", padding: 1,
      boxShadow: '-10px -5px 20px rgba(0, 0, 0, 0.8)',height: "50vh", margin: "auto", marginTop: 15 }}>
        <Box
          sx={{
            marginTop: 8,
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