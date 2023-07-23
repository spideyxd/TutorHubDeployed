import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import SearchIcon from "@mui/icons-material/Search"; // Import the SearchIcon
import { useNavigate } from "react-router-dom";
import DashMentee from "./Dash_Mentee";
import DashMentor from "./Dash_Mentor";

const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const sampleData = [
  {
    id: 1,
    firstName: "Shivam",
    lastName: "Spidey",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    firstName: "Saket",
    lastName: "Kothari",
    email: "kothari.saket@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    firstName: "Advit",
    lastName: "Sharma",
    email: "sharma.advit@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    firstName: "Shivam",
    lastName: "Smith",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    firstName: "Amol",
    lastName: "Pratap",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    firstName: "Shivam",
    lastName: "Smith",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 7,
    firstName: "Shivam",
    lastName: "Smith",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 8,
    firstName: "Shivam",
    lastName: "Smith",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 9,
    firstName: "Shivam",
    lastName: "Smith",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 10,
    firstName: "Shivam",
    lastName: "Smith",
    email: "spidey.shivam@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function ResponsiveDrawer() {
  const [rolee, setRolee] = useState("");
  const [user, setUser] = useState({});
  const [searchFilter, setSearchFilter] = useState("");
  const nav = useNavigate();

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const filteredData = sampleData.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.bio.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {sampleData.map((item) => (
            <ListItem key={item.id} component="div">
              <ListItemButton>
                <ListItemIcon>
                  <DoubleArrowIcon />
                </ListItemIcon>
                <ListItemText primary={item.firstName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
              Tutor Hub
            </Typography>
            <SearchIcon sx={{ mr: 1 }} />
            <input
              type="text"
              placeholder="Search..."
              value={searchFilter}
              onChange={handleSearchFilterChange}
            />
            <LogoutIcon sx={{ ml: 2 }} />
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2, mt:2 }}>
          {filteredData.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.firstName} {item.lastName}
                </Typography>
                <Typography color="text.secondary">{item.email}</Typography>
                <Typography variant="body2" component="p">
                  {item.bio}
                </Typography>
              </CardContent> +
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
