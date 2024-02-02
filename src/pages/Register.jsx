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
        background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,232,29,0.5803571428571428) 50%, rgba(252,176,69,1) 100%)", height: "100%", p: 1
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