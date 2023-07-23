import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Grid,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { Autocomplete } from '@mui/material';

const subjects = ['Math', 'Science', 'History', 'English', 'Computer Science'];
const classes = [9, 10, 11, 12];
const BASE_URL=process.env.REACT_APP_BASE_URL;
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  subject: Yup.string().required('Please select a subject'),
  classes: Yup.array().min(1, 'Please select at least one class').required('Please select at least one class'),
  bio: Yup.string().required('Bio is required'),
});

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

const MyForm = () => {
  const nav = useNavigate();
  const handleSubmit = async (values) => {

       fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }) .then((response) => response.json())
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
  };  

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box mt={4} p={3} bgcolor="#fff" color="#333" borderRadius={8}>
          <Typography variant="h4" align="center" gutterBottom>
            Register Form
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              subject: '',
              classes: [],
              bio: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="subject">Subject</InputLabel>
                      <Select
                        label="Subject"
                        native
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.subject && Boolean(errors.subject)}
                      >
                        <option aria-label="None" value="" />
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.subject && errors.subject && (
                      <ErrorMessage name="subject" component="div" style={{ color: '#bf3333', marginTop: '5px' }} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={classes}
                      getOptionLabel={(option) => `Class ${option}`}
                      value={values.classes}
                      onChange={(event, newValue) => {
                        setFieldValue('classes', newValue);
                      }}
                      renderInput={(params) => <TextField {...params} label="Classes" variant="outlined" />}
                    />
                    {touched.classes && errors.classes && (
                      <ErrorMessage name="classes" component="div" style={{ color: '#bf3333', marginTop: '5px' }} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bio && Boolean(errors.bio)}
                      helperText={touched.bio && errors.bio}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MyForm;
