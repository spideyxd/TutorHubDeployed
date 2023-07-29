import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import img from "../DesignAssets/user.jpg";
import { makeStyles } from "@mui/styles";
import { Modal, TextField, InputBase, IconButton } from "@mui/material";

const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#2196F3", // Change the background color to a desired color
    paddingLeft: "32px",
    paddingRight: "32px",
  },
  title: {
    flexGrow: 1,
    display: "none",
    "& > span": {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
  search: {
    position: "relative",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: "8px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#757575",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },

  inputInput: {
    padding: "8px",
    paddingLeft: "32px",
    width: "100%",
    "&::placeholder": {
      color: "#757575",
    },
  },
  appBarCommon: {
    backgroundColor: "#2196F3", // Change the background color to a desired color
    paddingLeft: "32px",
    paddingRight: "32px",
    color: "black", // Set the font color to black
    "& .MuiInputBase-root": {
      color: "black", // Set the font color to black for the InputBase component
    },
  },
});

export default function ResponsiveDrawer() {
  const [showPopup2, setShowPopup2] = React.useState(false);
  const [formEmail2, setFormEmail2] = useState("");
  const [showPopup, setShowPopup] = React.useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [sampleData, setSampleData] = useState([]); // Use useState for sampleData
  const nav = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    fetch(`${BASE_URL}/getAllTutors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        setSampleData(data); // Use setSampleData to update the value of sampleData
      })
      .catch((err) => {
        alert(err);
        nav("/error");
      });
  }, []);

  const [reviewsData, setReviewsData] = useState([]);
  const [showReviewsPopup, setShowReviewsPopup] = useState(false);

  // Function to fetch reviews for a specific tutor
  const fetchReviewsData = (email) => {
    setFormEmail2(email);
    // Make a request to the backend API to fetch reviews for the tutor with the given email
    fetch(`${BASE_URL}/getReviewsByTutorEmail?email=${email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        setReviewsData(data); // Update the reviews data state with the fetched data
        setShowReviewsPopup(true); // Show the reviews popup
      })
      .catch((err) => {
        alert("Error fetching reviews.");
      });
  };

  const handleSubjectFilterChange = (event) => {
    setSubjectFilter(event.target.value);
  };

  const handleClassFilterChange = (event) => {
    setClassFilter(event.target.value);
  };
  const [subjectFilter, setSubjectFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // Filter the data based on subject
  let filteredBySubjectData = sampleData.filter((item) =>
    item.subject.toLowerCase().includes(subjectFilter.toLowerCase())
  );

  // Filter the data based on classes
  let filteredByClassData = sampleData.filter((item) =>
    item.classes.some((cls) =>
      cls.toLowerCase().includes(classFilter.toLowerCase())
    )
  );

  // Use the intersection of the two filtered arrays
  let filteredData = filteredBySubjectData.filter((item) =>
    filteredByClassData.includes(item)
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestBody = {
      firstName: formData.get("name"),
      email: formData.get("email"),
      itemEmail: formEmail,
    };

    fetch(`${BASE_URL}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowPopup(false);
        alert("Request sent , We will update you on the provided mail ID ");
      })
      .catch((error) => {
        alert("Error ,Try again !");
      });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestBody = {
      test: formData.get("test"),
      email: formData.get("email"),
      itemEmail: formEmail2,
    };

    fetch(`${BASE_URL}/testimonial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowPopup2(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("Error ,Try again !");
      });
  };

  const handleConnectClick = (item) => {
    setShowPopup(true);
    setFormEmail(item);
  };
  const handleConnectClick2 = (item) => {
    setShowPopup2(true);
    
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Add the second search bar for classes */}
        <AppBar position="static" className={classes.appBarCommon}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              <span>Tutor Hub</span>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>{/* <SearchIcon /> */}</div>
              <InputBase
                type="text"
                placeholder=" Enter Subject ... (for example : math )"
                value={subjectFilter}
                onChange={handleSubjectFilterChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <IconButton color="inherit">{/* <LogoutIcon /> */}</IconButton>
          </Toolbar>
        </AppBar>

        {/* Second AppBar */}
        <AppBar position="static" className={classes.appBarCommon}>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>{/* <SearchIcon /> */}</div>
              <InputBase
                type="text"
                placeholder=" Enter Class ... (for example : 10 )"
                value={classFilter}
                onChange={handleClassFilterChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
            mt: 2,
          }}
        >
          {filteredData.map((item) => (
            <>
              <Card sx={{ maxWidth: 235 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={img}
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    <strong>
                      {capitalizeFirstLetter(item.firstName.toLowerCase())}
                    </strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontWeight: "bold" }}
                  >
                    <strong>Qualifications:</strong>
                    <ul>
                      {item.qualifications.map((qualification, index) => (
                        <li key={index}>
                          <strong>
                            {capitalizeFirstLetter(qualification.toLowerCase())}
                          </strong>
                        </li>
                      ))}
                    </ul>
                    <strong>Subject:</strong>{" "}
                    {capitalizeFirstLetter(item.subject.toLowerCase())}
                    <br />
                    <strong>Classes:</strong>{" "}
                    {item.classes.map((classItem, index) => (
                      <React.Fragment key={index}>
                        <strong>{`${classItem}${
                          index !== item.classes.length - 1 ? "," : ""
                        }`}</strong>
                        &nbsp;
                      </React.Fragment>
                    ))}
                  </Typography>
                </CardContent>
                <Modal
                  open={showReviewsPopup}
                  onClose={() => setShowReviewsPopup(false)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row", // Set the direction to row for horizontal layout
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      p: 4,
                      boxShadow: 24,
                      width: "70%", // Adjust the width as needed
                      maxHeight: "90%",
                      overflowY: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1, // This will make the content occupy the full available width
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          my: 4,
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#2196F3",
                        }}
                      >
                        Testimonials
                      </Typography>
                      {reviewsData.map((review, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            p: 2,
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            my: 2,
                            fontWeight: "bold",
                            fontSize: "1.2rem", 
                          }}
                        >
                          <Typography variant="body1" gutterBottom>
                            "{review.test}"
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ alignSelf: "flex-end" }}
                          >
                            - by {review.email}
                          </Typography>
                        </Box>
                      ))}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <br />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleConnectClick2(item.email.toLowerCase())
                          }
                        >
                         Submit Review
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Modal>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleConnectClick(item.email.toLowerCase())}
                  >
                    Connect
                  </Button>
                  <Button
                    size="small"
                    onClick={() => fetchReviewsData(item.email.toLowerCase())}
                  >
                    Reviews
                  </Button>
                </CardActions>
              </Card>
              <Modal open={showPopup} onClose={() => setShowPopup(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    boxShadow: 24,
                    width: 300,
                  }}
                >
                  <Typography variant="h6">Fill in your details</Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Name"
                      name="name"
                      fullWidth
                      required
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      required
                      sx={{ mt: 2 }}
                      readOnly
                    />
                    <input type="hidden" name="itemEmail" value={item.email} />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </Modal>
              <Modal open={showPopup2} onClose={() => setShowPopup2(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    boxShadow: 24,
                    width: 300,
                  }}
                >
                  <Typography variant="h6">Fill in your details</Typography>
                  <form onSubmit={handleSubmit2}>
                    <TextField
                      label="Testimonial"
                      name="test"
                      fullWidth
                      required
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      required
                      sx={{ mt: 2 }}
                      readOnly
                    />
                    <input type="hidden" name="itemEmail" value={item.email} />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </Modal>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
