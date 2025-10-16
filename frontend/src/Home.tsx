import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, TextField, Button, Alert, Box } from '@mui/material';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';
import logo from "./assets/images/Logo.png";

// Imports for icons in sidebar
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FlagIcon from "@mui/icons-material/Flag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function Home() {
    return (
        <>
          <AppBar 
          position="fixed"
          sx = {{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#516df6"
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
                height: 40,
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
                color: "white",
              }}
              >
              CASA
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer 
          variant='permanent'
          anchor='left'
          sx = {{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#516df6",
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
                  <ListItemText primary = "Main Menu" sx = {{
                    color: "grey",
                    }} />
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary = "Overview" />
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemIcon> 
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary = "Budgets"/>
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemIcon>
                    <FlagIcon />
                  </ListItemIcon>
                  <ListItemText primary = "Goals" />
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary = "Transactions" />
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary = "Report" />
                </ListItem>
              </List>

              <Divider />

              <List>
                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemText primary = "Settings" />
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemText primary = "Help" />
                </ListItem>

                <ListItem component="button"
                sx = {{
                  marginBottom: 1
                }}
                >
                  <ListItemText primary = "Log Out" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
          );
        
}