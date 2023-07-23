import React from 'react'
import Cards from "./Cards";
import { Link } from "react-router-dom";
import { Button } from "@mui/material"; 
import  sorry from "../DesignAssets/sorry.png"

const DashMentor = (props) => {
  return (
   <>
   {
   props.arr != undefined &&
          (props.arr.length == 0 ? (
        
           <img src={sorry} style={{ marginLeft:"25vw", width:"auto" ,maxHeight:"60vh" }}/>
          
          ) : (
            // <></>
            props.arr.map((value, idx) => <Cards name={value.name } email={value.email}  />)
            
          ))}</>
  )
}

export default DashMentor