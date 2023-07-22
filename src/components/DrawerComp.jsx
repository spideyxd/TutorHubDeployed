import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { List, ListItemButton,IconButton, ListItemText } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const DrawerComp = () => {
  const [drawerState, setDrawerState] = useState(false);
  const pages = ["Home", "About", "Contact"];

  return (
    <>
      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemText>{page}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <IconButton sx={{ color: "white"}}onClick={() => {setDrawerState(!drawerState)}}>
       
        <MenuOutlinedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
