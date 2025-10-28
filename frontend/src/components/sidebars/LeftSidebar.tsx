import React, { useState } from 'react';
import {Drawer, List, ListItem, Divider, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Imports for icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FlagIcon from "@mui/icons-material/Flag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LogoutIcon from '@mui/icons-material/Logout';

const buttonStyle = {
    borderRadius: "20px",
    width: "100%",
    fontWeight: "bold",
    fontSize: "18px",
    color: "black",
    textTransform: "none",
    backgroundColor: "white",
    justifyContent: "flex-start",
    "& .MuiButton-startIcon": { ml: 0, mr: 1.25 },
    "&:hover": {backgroundColor: "#D3D3D3"},
  };
  
  function CustomButton(props) {
    return <Button sx = {buttonStyle} {...props} />
  }

export default function LeftSidebar() {
  const navigate = useNavigate();

    return (
        <Drawer 
          variant='permanent'
          anchor='left'
          sx = {{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#3ca0ca",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          >

            <Toolbar />

            <Box sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              width: "85%",
              height: "85%",
              boxShadow: 3,
              overflow: "auto", 
              p: 1,
              }}>
              <List>
                <ListItem>
                  <Typography 
                  sx = {{
                    color: "grey",
                    fontSize: "18px",
                    fontWeight: "bold"
                  }}>
                    Main Menu
                    </Typography>
                </ListItem>

                <ListItem>
                  <CustomButton 
                  startIcon = {<DashboardIcon />}
                  onClick={() => navigate("/home")}
                  > 
                    Overview
                  </CustomButton>
                </ListItem>

                <ListItem>
                <CustomButton 
                startIcon = {<AccountBalanceWalletIcon />}
                onClick={() => navigate("/budgets")}
                > 
                    Budgets
                  </CustomButton>
                </ListItem>

                <ListItem>
                  <CustomButton startIcon = {<FlagIcon />}> 
                    Goals
                  </CustomButton>
                </ListItem>

                <ListItem>
                <CustomButton startIcon = {<ReceiptIcon />}> 
                    Transactions
                  </CustomButton>
                </ListItem>

                <ListItem>
                <CustomButton startIcon = {<AssessmentIcon />}> 
                    Report
                  </CustomButton>
                </ListItem>
              </List>

              <Divider />

              <ListItem>
              <Typography 
                  sx = {{
                    color: "grey",
                    fontSize: "18px",
                    fontWeight: "bold"
                  }}>
                    General
                    </Typography>
                </ListItem>

              <List disablePadding sx = {{mt: -0.4}}>
                <ListItem>
                <CustomButton startIcon = {<SettingsIcon />}> 
                    Settings
                  </CustomButton>
                </ListItem>

                <ListItem>
                <CustomButton startIcon = {<QuestionMarkIcon />}> 
                    Help
                  </CustomButton>
                </ListItem>
                
              </List>
            </Box>
          </Drawer>
    );
}