import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";

const ReviewsModal = ({ open, handleClose }) => {
    const theme = createTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [reviews, setReviews] = useState([
    {
      email: "john@example.com",
      review: "Excellent tutor! Helped me improve my math skills significantly.",
    },
    {
      email: "mary@example.com",
      review: "Patient and understanding tutor. Highly recommended!",
    },
    {
      email: "alex@example.com",
      review: "The best tutor I've ever had. Very knowledgeable and friendly.",
    },
  ]);

  const handleAddReview = () => {
    // Implement the logic to add a new review here
    // You can use the same handleSubmitTestimonial function with appropriate changes
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          width: isMobile ? "90%" : 500,
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reviews
          </Typography>
          <Grid container spacing={2}>
            {reviews.map((review, index) => (
              <Grid item key={index} xs={12}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://via.placeholder.com/150"
                    alt="User Avatar"
                  />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      {review.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.review}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
          {/* Add button to open the form to add a new review */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddReview}
            sx={{ ml: 1 }}
          >
            Add Review
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewsModal;
