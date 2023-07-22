import * as React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { TextField } from "@mui/material";
import emailjs from "@emailjs/browser";

const BASE_URL=process.env.REACT_APP_BASE_URL;



const domains = [
  "SDE",
  "Web Development",
  "App Development",
  "Analytics",
  "Non-Tech",
];

const purpose = [
  "Mock interviews",
  "Career guidance",
  "Resume review",
  "Consultancy",
];

const validationSchema = yup.object({
  email: yup.string("Enter email").email().required("email is required"),
  purpose: yup.string("Enter your purpose").required("Purpose is required"),
  mode: yup.string("Enter Mode of Communication").required("Mode is required"),
  date: yup.string().required(),
  domain: yup.string("Enter Domain").required("Domain is required"),
});



export default function EnterDetails(props) {
  const nav = useNavigate();

  const sendEmail = async () => {
    
    const toSend = {
   
    
        to_name: props.name,
        to_email: props.email,
      
    };
     
    
    emailjs
      .send(
        "service_xt8yg1p",
        "template_zu69wcu",
        toSend,
        "kFEBDIeZrqu4chvpx"
      )
      .then(
        (result) => {
                   
        },
        (error) => {
          alert(error.text);
        }
      );

      
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      purpose: "",
      date: new Date(),
      mode: "",
      domain: "",
    },

    validationSchema: validationSchema,
    

    onSubmit: (values,{resetForm}) => {
      
      fetch(`${BASE_URL}/deleteReq`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: props.email, name: props.name }),
      }).then(()=>{});

      
      fetch(`${BASE_URL}/submitDetails`, {
        // ye nhi hoga , get query run hogi yaha pe ,or data update hoga .
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "success"){alert("Form submitted");
        sendEmail();

        }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

        resetForm();
    },
  });

  

  const deleteRequest=()=>{

    
    fetch(`${BASE_URL}/deleteReq`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: props.email, name: props.name }),
    }).then(()=>{alert("Your requests have been deleted from the database");});

  }

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
            Enter Details
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                 
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
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="domain_">Domain</InputLabel>
                  <Select
                    labelId="domain"
                    id="domain"
                    name="domain"
                    value={formik.values.domain}
                    label="Domain"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.domain && Boolean(formik.errors.domain)
                    }
                    helperText={formik.touched.domain && formik.errors.domain}
                  >
                    {domains.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.domain && formik.errors.domain ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formik.touched.domain && formik.errors.domain}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="purpose_">Purpose</InputLabel>
                  <Select
                    labelId="purpose"
                    id="purpose"
                    name="purpose"
                    value={formik.values.purpose}
                    label="purpose"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.purpose && Boolean(formik.errors.purpose)
                    }
                    helperText={formik.touched.purpose && formik.errors.purpose}
                  >
                    {purpose.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.purpose && formik.errors.purpose ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formik.touched.purpose && formik.errors.purpose}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="mode_">Mode</InputLabel>
                  <Select
                    labelId="mode"
                    id="mode"
                    name="mode"
                    value={formik.values.mode}
                    label="mode"
                    onChange={formik.handleChange}
                    error={formik.touched.mode && Boolean(formik.errors.mode)}
                    helperText={formik.touched.mode && formik.errors.mode}
                  >
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                  </Select>
                  {formik.touched.mode && formik.errors.mode ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formik.touched.mode && formik.errors.mode}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
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
              Find Mentor
            </Button>
            <Button
              style={{
                width: "30%",
                marginRight: "auto",
                marginLeft: "auto",
                display: "block",
                color: "black",
                fontFamily: "Barlow",
                backgroundImage:
                  "linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)",
              }}
              onClick={deleteRequest}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Delete Requests
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
}
