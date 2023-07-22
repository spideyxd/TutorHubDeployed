import React from "react";
import "../stylesheets/Font.css";
import AppBar from "@mui/material/AppBar";
import { Button, Tab, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import DrawerComp from "./DrawerComp";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const list = ["Home", "About", "Contact"];
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const BASE_URL=process.env.REACT_APP_BASE_URL;

  return (
    <>
      <AppBar
        sx={{ backgroundColor: "#121212" }}
        position="static"
        elevation={0}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerComp />

              <Button
                size="small"
                onClick={() => {
                  
                  fetch(`${BASE_URL}/getinfo`, {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                  })
                    .then((data) => data.json())
                    .then((data) => {
                      nav("/dashboard");
                    })
                    .catch((err) => {
                      nav("/login");
                    });
                }}
                style={{ textTransform: "none", marginLeft: "auto" }}
                sx={{ ml: "auto" }}
                variant="outlined"
                color="error"
              >
                LOGIN AS TUTOR
              </Button>
            </>
          ) : (
            <>
              <Tabs  value={0} sx={{ mx: "auto" }}>
                
                    <Tab
                      label="A small Project by JIIT Student ,made with  &nbsp;   &#9829;"
                      style={{
                        color: "white",
                        fontFamily: "Barlow",
                        fontSize: "12px",
                      }}
                    >
                    
                    </Tab>
                
              </Tabs> 

              <Button
                onClick={() => {
                  
                  fetch(`${BASE_URL}/getinfo`, {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                  })
                    .then((data) => data.json())
                    .then((data) => {
                      nav("/dashboard");
                    })
                    .catch((err) => {
                      nav("/login");
                    });
                }}
                size="large"
                style={{
                  textAlign: "right",
                  textDecoration: "none",
                  textTransform: "none",
                }}
                variant="outlined"
                color="error"
              >
                 LOGIN AS TUTOR
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
