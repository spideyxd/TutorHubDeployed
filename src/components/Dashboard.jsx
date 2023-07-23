import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DashMentee from "./Dash_Mentee";
import DashMentor from "./Dash_Mentor";

const drawerWidth = 240;


const BASE_URL=process.env.REACT_APP_BASE_URL;

export default function ResponsiveDrawer() {
  const [user, setUser] = React.useState({});
  const nav = useNavigate();


  React.useEffect(() => {
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
        // console.log(data);
        setUser(data);
      })
      .catch((err) => {
        alert(err);
        nav("/error");
      });
  }, []);

  const { firstName,email,subject } = user;

  const userData = [firstName,email,subject];

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
       
        color: "white",
        height: "100vh",
        backgroundImage: "linear-gradient(#000000,#130F40)",  
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {userData.map((text, index) => (
          <ListItem
            style={{ textTransform: "capitalize" }}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <DoubleArrowIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    style={{ fontFamily: "Barlow", letterSpacing: "0.2em" }}
                  >
                    {text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key="Logout" disablePadding>
          <ListItemButton
            onClick={() => {
              fetch(`${BASE_URL}/logout`, {
                method: "GET",
                headers: {
                  Accept: "appllication/json",
                  "Content-Type": "application/json",
                },
                credentials: "include",
              })
                .then((res) => {
                  nav("/login", { replace: true });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <ListItemIcon>
              <LogoutIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{ fontFamily: "Barlow", letterSpacing: "0.2em" }}
                >
                  Logout
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      
      <AppBar
        position="fixed"
        style={{ backgroundImage: "linear-gradient(#000000,#130F40)" }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            style={{ textTransform: "capitalize", fontFamily: "Barlow" }}
            variant="h4"
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
     
      <Drawer 
        variant="permanent"
        
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      ><Box sx={{ overflow: 'auto' }}>
        {drawer}
        </Box>
      </Drawer>

      <Box component="main"
        sx=
        {{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          mt: "4.5vh",
        }}
        >        
          <DashMentor arr={user.students !== undefined ? user.students : []} />
        </Box>
    </Box>
  );
}
