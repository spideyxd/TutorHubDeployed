import React, { useState ,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from '@mui/material/Button';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";  
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import img from "../DesignAssets/user.jpg";
import {  Modal, TextField } from '@mui/material';


const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function ResponsiveDrawer() {
  const [showPopup, setShowPopup] = React.useState(false);
  const [formEmail, setFormEmail] = useState('');
  const [searchFilter, setSearchFilter] = useState("");
  const [sampleData, setSampleData] = useState([]); // Use useState for sampleData
  const nav = useNavigate();

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


  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };
  
  let filteredData = sampleData.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchFilter.toLowerCase())
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestBody = {
      firstName: formData.get('name'),
      email: formData.get('email'),
      itemEmail: formEmail, // Include the item.email in the request body
    };

    // Send the form data to the /request endpoint (you can use fetch or any HTTP library)
    fetch(`${BASE_URL}/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from backend:', data);
        // Hide the popup after successful submission (you can handle this based on the backend response)
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
      });
  };

  const handleConnectClick = (item) => {
    setShowPopup(true);
    setFormEmail(item); // Set the formEmail state with the current card's item.email
  };


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
            <>
            <Card sx={{ maxWidth: 235 }}>
            <CardMedia
              sx={{ height: 200, }}
              image={img}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {capitalizeFirstLetter(item.firstName.toLowerCase())}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {capitalizeFirstLetter(item.bio.toLowerCase())}
        <br />
        Subject: {capitalizeFirstLetter(item.subject.toLowerCase())}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleConnectClick(item.email.toLowerCase())}>Connect</Button>
              <Button size="small">Check Profile</Button>
            </CardActions>
          </Card>
          <Modal open={showPopup} onClose={() => setShowPopup(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, boxShadow: 24, width: 300 }}>
          <Typography variant="h6">Fill in your details</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" fullWidth required sx={{ mt: 2 }} />
            <TextField label="Email" name="email" type="email" fullWidth required sx={{ mt: 2 }} readOnly  />
            <input type="hidden" name="itemEmail" value={item.email} />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
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
