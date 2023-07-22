import React from "react";
import Cards from "./Cards";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import EnterDetails from "./DetailsForm";
const DashMentee = (props) => {
  return (
    <>
    
      <EnterDetails  name={props.name} email={props.email} />
    
      
    </>
  );
};

export default DashMentee;
