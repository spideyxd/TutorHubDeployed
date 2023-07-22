import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";



const team = [
  {
    Name: "Shivam",
    Link: "Shivam2612002@gmail.com",
    img: "",
  },
  {
    Name: "Riya",
    Link: "Riya@gmail.com",
    img: "",
  },
  {
    Name: "Lakshita",
    Link: "Lakshita@gmail.com",
    img: "",
  },
];

const Team = () => {
  return (
    <>
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
         
          borderRadius: 1,
        }}
      >
     { 
     team.map((val)=>(
     
      <Card sx={{ width:220,minWidth: 70 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {val.Name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {val.Link}
            </Typography>
          </CardContent>
        </CardActionArea>   
      </Card>
    
     ))
     }
       </Box>
    </>
  );
};

export default Team;
