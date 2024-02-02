import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import RegisterForm, { registerSchema } from "../components/auth/RegisterForm";
import useAuthCalls from "../hooks/useAuthCalls";
import { Stack } from "@mui/material";


const defaultTheme = createTheme();

export default function Register() {

  const { register } = useAuthCalls()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack sx={{
        background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)", height: "100%", p: 1
      }}>
        <Container component="main" maxWidth="xs">

          <Box
            sx={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Formik
              initialValues={{
                username: "",
                password: "",
                email: "",
                firstName: "",
                lastName: "",
                image: "",
                city: "",
                bio: "",
              }}
              validationSchema={registerSchema}
              onSubmit={(values, actions) => {
                register(values);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
              component={(props) => <RegisterForm {...props} />}
            ></Formik>
          </Box>
        </Container>
      </Stack>
    </ThemeProvider>
  );
}