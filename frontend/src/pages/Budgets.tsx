import React from "react";
import {Box, AppBar, Toolbar, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import LeftSidebar from '../components/sidebars/LeftSidebar';
import RightSidebar from '../components/sidebars/RightSidebar';
import logo from "../assets/images/Logo.png";

export default function Budgets() {
  const navigate = useNavigate();

    return (
        <>
          <AppBar 
          position="fixed"
          sx = {{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "white"
          }}
          >
            <Toolbar sx = {{
              display: "flex",
              alignItems: "center"
            }}>
              <Box
              component = "img"
              src = {logo}
              alt = "CASA Logo"
              sx = {{
                height: 55,
                width: "auto",
                marginRight: 1.5,
              }}
              />

              <Typography 
              variant="h6"
              noWrap
              component = "div"
              sx = {{
                fontWeight: "bold",
                letterSpacing: 1,
                color: "red",
              }}
              >
              CASA
              </Typography>
            </Toolbar>
          </AppBar>

          <Box sx={{display: "flex"}}>
            <LeftSidebar />
          </Box>
          
          <Box sx={{display: "flex"}}>
            <RightSidebar />
          </Box> 

          </>
          );
}