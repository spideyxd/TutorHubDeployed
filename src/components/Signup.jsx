import * as React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// require('dotenv').config();

const domains = [
  "SDE",
  "Web Development",
  "App Development",
  "Analytics",
  "Non-Tech",
];

const BASE_URL=process.env.REACT_APP_BASE_URL;

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 characters minimum."),

  firstName: yup
    .string("Enter your first name")
    .min(2, "First Name should be of minimum 2 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(2, "Last Name should be of minimum 2 characters length")
    .required("Last Name is required"),
});

export default function SignUp() {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log("try1");
      fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "error") alert("Email already exist");
          else {
            alert("Registration Successfull");
            nav("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  const myStyle = {
    borderRadius: "5px",
    color: "white",
    backgroundColor: "#ffffff",
    padding: "10px",
    backgroundImage: "linear-gradient(to right,#BDC3C7, #2C3E50)",
  };

  // w

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          style={myStyle}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#010915" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            style={{
              fontFamily: "BarlowThicc",
              color: "#121212",
              fontSize: "3em",
            }}
            variant="h4"
          >
            Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type="password"
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
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="Role_">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    label="Role"
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="Mentor">Mentor</MenuItem>
                    <MenuItem value="Mentee">Mentee</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formik.touched.role && formik.errors.role}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid> */}

          
                  </Grid>
            <Button
              style={{
                width: "90%",
                marginRight: "auto",
                marginLeft: "auto",
                display: "block",
                color: "black",
                fontFamily: "Barlow",
                backgroundImage:
                  "linear-gradient(90deg, #c9d6ff 0%, #e2e2e2 100%)",
              }}
              onClick={formik.handleSubmit}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
}
