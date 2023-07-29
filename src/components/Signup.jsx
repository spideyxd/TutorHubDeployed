import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Select, 
  Button,
  Container,
  Grid,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { Autocomplete } from '@mui/material';

const subjects = [
  'Mathematics',
  'Science',
  'Social Studies',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Economics',
  'Political Science',
  'Computer Science',
  'Accountancy',
  'Business Studies',
  'Physical Education',
  'Home Science',
  'Psychology',
  'Sociology',
  'Music',
  'Fine Arts',
];

const classes = [9, 10, 11, 12];
const BASE_URL=process.env.REACT_APP_BASE_URL;
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  subject: Yup.string().required('Please select a subject'),
  classes: Yup.array().min(1, 'Please select at least one class').required('Please select at least one class'),
  qualifications: Yup.array().required('Qualification is required'),
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

  const qualifications = [
    // Bachelor's Degrees (BA)
    "Bachelor of Arts (BA) in English",
    "Bachelor of Arts (BA) in History",
    "Bachelor of Arts (BA) in Psychology",
    "Bachelor of Arts (BA) in Sociology",
    "Bachelor of Arts (BA) in Political Science",
    "Bachelor of Arts (BA) in Economics",
    "Bachelor of Arts (BA) in Geography",
    "Bachelor of Arts (BA) in Philosophy",
    "Bachelor of Arts (BA) in Anthropology",
    "Bachelor of Arts (BA) in Journalism",
    "Bachelor of Arts (BA) in Communication Studies",
    "Bachelor of Arts (BA) in Fine Arts",
    "Bachelor of Arts (BA) in Music",
    "Bachelor of Arts (BA) in Theater Arts",
    "Bachelor of Arts (BA) in Education",
    
    // Master's Degrees (MA)
    "Master of Arts (MA) in English",
    "Master of Arts (MA) in History",
    "Master of Arts (MA) in Psychology",
    "Master of Arts (MA) in Sociology",
    "Master of Arts (MA) in Political Science",
    "Master of Arts (MA) in Economics",
    "Master of Arts (MA) in Geography",
    "Master of Arts (MA) in Philosophy",
    "Master of Arts (MA) in Anthropology",
    "Master of Arts (MA) in Journalism",
    "Master of Arts (MA) in Communication Studies",
    "Master of Arts (MA) in Fine Arts",
    "Master of Arts (MA) in Music",
    "Master of Arts (MA) in Theater Arts",
    "Master of Arts (MA) in Education",
    
    // Bachelor of Science (BSc)
    "Bachelor of Science (BSc) in Physics",
    "Bachelor of Science (BSc) in Chemistry",
    "Bachelor of Science (BSc) in Mathematics",
    "Bachelor of Science (BSc) in Biology",
    "Bachelor of Science (BSc) in Computer Science",
    "Bachelor of Science (BSc) in Electronics",
    "Bachelor of Science (BSc) in Environmental Science",
    "Bachelor of Science (BSc) in Biotechnology",
    "Bachelor of Science (BSc) in Microbiology",
    "Bachelor of Science (BSc) in Nursing",
    "Bachelor of Science (BSc) in Nutrition and Dietetics",
    "Bachelor of Science (BSc) in Psychology",
    "Bachelor of Science (BSc) in Zoology",
    "Bachelor of Science (BSc) in Botany",
    
    // Master of Science (MSc)
    "Master of Science (MSc) in Physics",
    "Master of Science (MSc) in Chemistry",
    "Master of Science (MSc) in Mathematics",
    "Master of Science (MSc) in Biology",
    "Master of Science (MSc) in Computer Science",
    "Master of Science (MSc) in Electronics",
    "Master of Science (MSc) in Environmental Science",
    "Master of Science (MSc) in Biotechnology",
    "Master of Science (MSc) in Microbiology",
    "Master of Science (MSc) in Nursing",
    "Master of Science (MSc) in Nutrition and Dietetics",
    "Master of Science (MSc) in Psychology",
    "Master of Science (MSc) in Zoology",
    "Master of Science (MSc) in Botany",
    
    // Bachelor of Technology (B.Tech)
    "Bachelor of Technology (B.Tech) in Computer Science",
    "Bachelor of Technology (B.Tech) in Information Technology",
    "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
    "Bachelor of Technology (B.Tech) in Electrical Engineering",
    "Bachelor of Technology (B.Tech) in Mechanical Engineering",
    "Bachelor of Technology (B.Tech) in Civil Engineering",
    "Bachelor of Technology (B.Tech) in Aerospace Engineering",
    "Bachelor of Technology (B.Tech) in Chemical Engineering",
    "Bachelor of Technology (B.Tech) in Biotechnology",
    "Bachelor of Technology (B.Tech) in Environmental Engineering",
    "Bachelor of Technology (B.Tech) in Industrial Engineering",
    "Bachelor of Technology (B.Tech) in Automotive Engineering",
    "Bachelor of Technology (B.Tech) in Robotics and Artificial Intelligence",
    "Bachelor of Technology (B.Tech) in Data Science",
    "Bachelor of Technology (B.Tech) in Cybersecurity",
    
    // Master of Technology (M.Tech)
    "Master of Technology (M.Tech) in Computer Science",
    "Master of Technology (M.Tech) in Information Technology",
    "Master of Technology (M.Tech) in Electronics and Communication Engineering",
    "Master of Technology (M.Tech) in Electrical Engineering",
    "Master of Technology (M.Tech) in Mechanical Engineering",
    "Master of Technology (M.Tech) in Civil Engineering",
    "Master of Technology (M.Tech) in Aerospace Engineering",
    "Master of Technology (M.Tech) in Chemical Engineering",
    "Master of Technology (M.Tech) in Biotechnology",
    "Master of Technology (M.Tech) in Environmental Engineering",
    "Master of Technology (M.Tech) in Industrial Engineering",
    "Master of Technology (M.Tech) in Automotive Engineering",
    "Master of Technology (M.Tech) in Robotics and Artificial Intelligence",
    "Master of Technology (M.Tech) in Data Science",
    "Master of Technology (M.Tech) in Cybersecurity",
    
    // Bachelor of Business Administration (BBA)
    "Bachelor of Business Administration (BBA) in Finance",
    "Bachelor of Business Administration (BBA) in Marketing",
    "Bachelor of Business Administration (BBA) in Human Resource Management",
    "Bachelor of Business Administration (BBA) in International Business",
    "Bachelor of Business Administration (BBA) in Entrepreneurship",
    "Bachelor of Business Administration (BBA) in Operations Management",
    "Bachelor of Business Administration (BBA) in Business Analytics",
    "Bachelor of Business Administration (BBA) in Supply Chain Management",
    "Bachelor of Business Administration (BBA) in Information Technology Management",
    
    // Master of Business Administration (MBA)
    "Master of Business Administration (MBA) in Finance",
    "Master of Business Administration (MBA) in Marketing",
    "Master of Business Administration (MBA) in Human Resource Management",
    "Master of Business Administration (MBA) in International Business",
    "Master of Business Administration (MBA) in Entrepreneurship",
    "Master of Business Administration (MBA) in Operations Management",
    "Master of Business Administration (MBA) in Business Analytics",
    "Master of Business Administration (MBA) in Supply Chain Management",
    "Master of Business Administration (MBA) in Information Technology Management",
    
    // Bachelor of Commerce (B.Com)
    "Bachelor of Commerce (B.Com) in Accounting",
    "Bachelor of Commerce (B.Com) in Finance",
    "Bachelor of Commerce (B.Com) in Taxation",
    "Bachelor of Commerce (B.Com) in Economics",
    "Bachelor of Commerce (B.Com) in Marketing",
    "Bachelor of Commerce (B.Com) in Banking and Insurance",
    "Bachelor of Commerce (B.Com) in Business Law",
    "Bachelor of Commerce (B.Com) in Auditing",
    "Bachelor of Commerce (B.Com) in E-Commerce",
    
    // Master of Commerce (M.Com)
    "Master of Commerce (M.Com) in Accounting",
    "Master of Commerce (M.Com) in Finance",
    "Master of Commerce (M.Com) in Taxation",
    "Master of Commerce (M.Com) in Economics",
    "Master of Commerce (M.Com) in Marketing",
    "Master of Commerce (M.Com) in Banking and Insurance",
    "Master of Commerce (M.Com) in Business Law",
    "Master of Commerce (M.Com) in Auditing",
    "Master of Commerce (M.Com) in E-Commerce",
    
    // Bachelor of Computer Applications (BCA)
    "Bachelor of Computer Applications (BCA) in Software Development",
    "Bachelor of Computer Applications (BCA) in Web Development",
    "Bachelor of Computer Applications (BCA) in Mobile App Development",
    "Bachelor of Computer Applications (BCA) in Data Science",
    "Bachelor of Computer Applications (BCA) in Artificial Intelligence",
    "Bachelor of Computer Applications (BCA) in Information Security",
    "Bachelor of Computer Applications (BCA) in Cloud Computing",
    
    // Master of Computer Applications (MCA)
    "Master of Computer Applications (MCA) in Software Development",
    "Master of Computer Applications (MCA) in Web Development",
    "Master of Computer Applications (MCA) in Mobile App Development",
    "Master of Computer Applications (MCA) in Data Science",
    "Master of Computer Applications (MCA) in Artificial Intelligence",
    "Master of Computer Applications (MCA) in Information Security",
    "Master of Computer Applications (MCA) in Cloud Computing",
    
    // Bachelor of Science in Nursing (B.Sc Nursing)
    "Bachelor of Science in Nursing (B.Sc Nursing) in Medical-Surgical Nursing",
    "Bachelor of Science in Nursing (B.Sc Nursing) in Obstetrics and Gynecology Nursing",
    "Bachelor of Science in Nursing (B.Sc Nursing) in Pediatric Nursing",
    "Bachelor of Science in Nursing (B.Sc Nursing) in Psychiatric Nursing",
    "Bachelor of Science in Nursing (B.Sc Nursing) in Community Health Nursing",
    "Bachelor of Science in Nursing (B.Sc Nursing) in Critical Care Nursing",
    "Bachelor of Science in Nursing (B.Sc Nursing) in Cardiovascular and Thoracic Nursing",
    
    // Master of Science in Nursing (M.Sc Nursing)
    "Master of Science in Nursing (M.Sc Nursing) in Medical-Surgical Nursing",
    "Master of Science in Nursing (M.Sc Nursing) in Obstetrics and Gynecology Nursing",
    "Master of Science in Nursing (M.Sc Nursing) in Pediatric Nursing",
    "Master of Science in Nursing (M.Sc Nursing) in Psychiatric Nursing",
    "Master of Science in Nursing (M.Sc Nursing) in Community Health Nursing",
    "Master of Science in Nursing (M.Sc Nursing) in Critical Care Nursing",
    "Master of Science in Nursing (M.Sc Nursing) in Cardiovascular and Thoracic Nursing",
    
    // Bachelor of Science in Agriculture (B.Sc Agriculture)
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Agronomy",
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Horticulture",
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Plant Pathology",
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Soil Science",
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Agricultural Economics",
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Agricultural Engineering",
    "Bachelor of Science in Agriculture (B.Sc Agriculture) in Plant Breeding and Genetics",
    
    // Master of Science in Agriculture (M.Sc Agriculture)
    "Master of Science in Agriculture (M.Sc Agriculture) in Agronomy",
    "Master of Science in Agriculture (M.Sc Agriculture) in Horticulture",
    "Master of Science in Agriculture (M.Sc Agriculture) in Plant Pathology",
    "Master of Science in Agriculture (M.Sc Agriculture) in Soil Science",
    "Master of Science in Agriculture (M.Sc Agriculture) in Agricultural Economics",
    "Master of Science in Agriculture (M.Sc Agriculture) in Agricultural Engineering",
    "Master of Science in Agriculture (M.Sc Agriculture) in Plant Breeding and Genetics",
    
    // Bachelor of Design (B.Des)
    "Bachelor of Design (B.Des) in Fashion Design",
    "Bachelor of Design (B.Des) in Interior Design",
    "Bachelor of Design (B.Des) in Graphic Design",
    "Bachelor of Design (B.Des) in Product Design",
    "Bachelor of Design (B.Des) in Textile Design",
    "Bachelor of Design (B.Des) in Industrial Design",
    "Bachelor of Design (B.Des) in Animation and Multimedia",
    
    // Master of Design (M.Des)
    "Master of Design (M.Des) in Fashion Design",
    "Master of Design (M.Des) in Interior Design",
    "Master of Design (M.Des) in Graphic Design",
    "Master of Design (M.Des) in Product Design",
    "Master of Design (M.Des) in Textile Design",
    "Master of Design (M.Des) in Industrial Design",
    "Master of Design (M.Des) in Animation and Multimedia",
  ];
  

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box mt={4} p={3} bgcolor="#fff" color="#333" borderRadius={8}>
          <Typography variant="h3" align="center" gutterBottom>
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
              qualifications: [],
              testimonials:[]
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
                    <Autocomplete
                      multiple
                      options={qualifications}
                      getOptionLabel={(option) => option}
                      value={values.qualifications}
                      onChange={(event, newValue) => {
                        setFieldValue("qualifications", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Qualification" variant="outlined" />
                      )}
                    />
                    {touched.qualifications && errors.qualifications && (
                      <ErrorMessage
                        name="qualifications"
                        component="div"
                        style={{ color: "#bf3333", marginTop: "5px" }}
                      />
                    )}
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
