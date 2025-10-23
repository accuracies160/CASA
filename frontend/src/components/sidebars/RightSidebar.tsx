import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, TextField, Button, Alert, Box } from '@mui/material';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';
import logo from "./assets/images/Logo.png";

// Imports for icons
import AccountCircle from '@mui/icons-material/AccountCircle';

const buttonStyle = {
    borderRadius: "20px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "18px",
    color: "black",
    textTransform: "none",
    backgroundColor: "white",
    "&:hover": {backgroundColor: "#3ca0ca"},
  };
  
  function CustomButton(props) {
    return <Button sx = {buttonStyle} {...props} />
  }

export default function RightSidebar() {
    return (
        <Drawer 
          variant='permanent'
          anchor='right'
          sx = {{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
          >

          <Toolbar />
          
          <Button 
            startIcon = {<AccountCircle />}
                sx = {{
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "18px",
                color: "black",
                textTransform: "none"
            }}
            >
            Profile
            </Button>

          </Drawer>
    );
}