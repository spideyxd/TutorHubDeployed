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

const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function ResponsiveDrawer() {

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
  // console.log(sampleData);

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
              <Button size="small">Connect</Button>
              <Button size="small">Check Profile</Button>
            </CardActions>
          </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
