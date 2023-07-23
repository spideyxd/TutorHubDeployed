import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import illust from "../DesignAssets/login.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const BASE_URL=process.env.REACT_APP_BASE_URL;

// VALIDATION SCHEMA

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your Password  ")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

//LOGIN FUNCTION

export default function SignInSide() {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      //initial values
      password: "",
      email: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {console.log(BASE_URL);
                           fetch(`${BASE_URL}/loginB`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "error") alert("Invalid credentials");
          else {
            nav("/dashboard");
          }
        })
        .catch((error) => {
          alert("Retry");
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "80vh", width: "80vw", ml: "10vw", mt: "10vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={7}
          sx={{
            backgroundImage: `url(${illust})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          style={{
            backgroundImage: "linear-gradient(to right,#BDC3C7, #2C3E50)",
          }}
          item
          xs={12}
          sm={7}
          md={5}
          component={Paper}
          elevation={9}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#010915" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography variant="h4">
              <span
                style={{
                  fontSize: "1.5em",
                  fontFamily: "BarlowThicc",
                  fontWeight: "500",
                }}
              >
                Login
              </span>
            </Typography>

            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoFocus
                />
                <TextField
                  style={{ outline: "none", border: "none" }}
                  type="password"
                  margin="normal"
                  autoComplete="password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoFocus
                />
                <Button
                  style={{
                    fontFamily: "Barlow",
                    color: "black",
                    backgroundImage:
                      "linear-gradient(to left,#BDC3C7, #2C3E50)",
                  }}
                  onClick={formik.handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >  Login
                </Button>
                <Grid container>                 
                  <Grid
                    item
                    style={{
                      textAlign: "right",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
