import { Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import React from "react";
import illus from "../DesignAssets/illust.png";
import "../stylesheets/Font.css";
import { useNavigate } from "react-router-dom";


const Banner = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down(1423));
  const nav = useNavigate();
  const BASE_URL=process.env.REACT_APP_BASE_URL;

 

  return (
    <>
      {isMatch ? (
        <>
          <div
            style={{
              marginTop: "16vh",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                    nav("/search");
              }}
              variant="outlined"
              color="error"
              style={{
                borderRadius: "50px",
                marginTop: "6vh",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Connect Now
            </Button>

            <Typography
              variant="subtitle1"
              sx={{
                width: "50vw",
                marginTop: "20px",
                color: "white",
                fontFamily: "Barlow",
              }}
            >
               "Linking Students with Knowledgeable Tutors for Academic Success" &nbsp;
              <span style={{ fontStyle: "italic", color: "#84EAA0" }}>
                Connect Now.
              </span>
            </Typography>
            <div>
              <Typography
                sx={{
                  marginTop: "5vh",
                  color: "white",
                  fontFamily: "Barlow",
                  fontSize: "5vw",
                }}
                variant="h2"
              >
               Unlock Your Learning Potential with Trusted Tutors <br />
                <span style={{ fontStyle: "italic" }}>
                  Prep<span style={{ color: "#84EAA0" }}>Hour</span>
                </span>
              </Typography>
            </div>

            <div>
              <img src={illus} style={{ height: "auto", maxWidth: "65vw" }} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              marginTop: "16vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              <Typography
                sx={{ color: "white", fontFamily: "Barlow", fontSize: "3vw" }}
                variant="h2"
              >
                 <span style={{ fontSize:"4vw",fontStyle: "italic" }}>
                Tutor<span style={{ color: "#84EAA0" }}>HUB</span>
                </span><br/>
                Unlock Your Learning Potential<br/>  with Trusted Tutors.
               
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  width: "50vw",
                  marginTop: "20px",
                  color: "white",
                  fontFamily: "Barlow",
                }}
              >
                "Linking Students with Knowledgeable Tutors for Academic Success" &nbsp;
                <span style={{ fontStyle: "italic", color: "#84EAA0" }}>
                  Connect Now.
                </span>
              </Typography>

              <Button
              onClick={() => {
                    nav("/search");
              }}
              variant="outlined"
              color="error"
              style={{
                borderRadius: "50px",
                marginTop: "6vh",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
                Connect Now
              </Button>
            </div>
            <div>
              <img src={illus} style={{ height: "50vh" }} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Banner;
