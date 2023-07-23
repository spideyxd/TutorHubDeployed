import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../DesignAssets/user.jpg";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const BASE_URL=process.env.REACT_APP_BASE_URL;

export default function Cards(props) {
  const [x, setX] = React.useState(1);
  const nav = useNavigate();
  const [user, setUser] = React.useState({});
  const getInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getinfo`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      nav("/login");
    }
  };
  const deleteCard = async () => {
    try {
      const res = await fetch(`${BASE_URL}/decline`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, userEmail: props.email}),
      });
      const data = await res.json();
      console.log(data.msg);
      if (data.msg == "success") window.location.reload();
    } catch (err) { 
      
    }
  };

  React.useEffect(() => {
    getInfo();
  }, []);
  
  const sendEmail = async () => {
    
    const toSend = {
   
        from_name: user.firstName,
        from_email: user.email,
        to_name: props.name,
        to_email: props.email,
      
    };
     
    
    emailjs
      .send(
        "service_xt8yg1p",
        "template_qszcfqm",
        toSend,
        "kFEBDIeZrqu4chvpx"
      )
      .then(
        (result) => {
          alert("Mail Sent !");
           deleteCard();
        },
        (error) => {
          alert(error.text);
        }
      );

      
  };

  return (
    <Card sx={{ m: 5, width: 240 }}>
      <CardMedia component="img" alt="User" height="180" image={img} />
      <CardContent>
        <Typography
          style={{ fontFamily:"BarlowThicc", textTransform: "capitalize" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {props.name}
        </Typography>
        <Typography  style={{ fontFamily:"BarlowThicc", textTransform: "capitalize" }} variant="body2" color="text.secondary">
          {props.email}
        </Typography>
      </CardContent>
      <CardActions >
        <Button style={{ fontFamily:"BarlowThicc", textTransform: "capitalize" }} size="small" onClick={sendEmail}>
           ACCEPT
        </Button>
        <Button  style={{ fontFamily:"BarlowThicc", textTransform: "capitalize" }}size="small" onClick={deleteCard}>
         DECLINE
        </Button>
      </CardActions>
    </Card>
  );
}
