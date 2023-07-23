import React, { useState ,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from '@mui/material/Button';
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
import { makeStyles } from '@mui/styles';
import {  Modal, TextField ,InputBase, IconButton } from '@mui/material';


const drawerWidth = 240;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#2196F3', // Change the background color to a desired color
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    '& > span': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: '8px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#757575',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  
  inputInput: {
    padding: '8px',
    paddingLeft: '32px',
    width: '100%',
    '&::placeholder': {
      color: '#757575',
    },
  },
  appBarCommon: {
    backgroundColor: '#2196F3', // Change the background color to a desired color
    paddingLeft: '32px',
    paddingRight: '32px',
    color: 'black', // Set the font color to black
    '& .MuiInputBase-root': {
      color: 'black', // Set the font color to black for the InputBase component
    },
  },

});


export default function ResponsiveDrawer() {
  const [showPopup, setShowPopup] = React.useState(false);
  const [formEmail, setFormEmail] = useState('');
  const [searchFilter, setSearchFilter] = useState("");
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
    item.classes.some((cls) => cls.toLowerCase().includes(classFilter.toLowerCase()))
  );

  // Use the intersection of the two filtered arrays
  let filteredData = filteredBySubjectData.filter((item) =>
    filteredByClassData.includes(item)
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestBody = {
      firstName: formData.get('name'),
      email: formData.get('email'),
      itemEmail: formEmail, 
    };

    fetch(`${BASE_URL}/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

  const handleConnectClick = (item) => {
    setShowPopup(true);
    setFormEmail(item);
  };


  return (
    <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        {/* Add the second search bar for classes */}
        <AppBar position="static" className={classes.appBarCommon}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <span>Tutor Hub</span>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              {/* <SearchIcon /> */}
            </div>
            <InputBase
              type="text"
              placeholder=" Enter Subject ... (for example : math )"
              value={subjectFilter}
              onChange={handleSubjectFilterChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton color="inherit">
            {/* <LogoutIcon /> */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Second AppBar */}
      <AppBar position="static" className={classes.appBarCommon}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              {/* <SearchIcon /> */}
            </div>
            <InputBase
              type="text"
              placeholder=" Enter Class ... (for example : 10 )"
              value={classFilter}
              onChange={handleClassFilterChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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
