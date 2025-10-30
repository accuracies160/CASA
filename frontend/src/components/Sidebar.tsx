import {Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Drawer} from "@mui/material";

/* Import for icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FlagIcon from "@mui/icons-material/Flag";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { to: "/overview", label: "Overview", icon: <DashboardIcon /> },
  { to: "/budgets", label: "Budgets", icon: <AccountBalanceWalletIcon /> },
  { to: "/goals", label: "Goals", icon: <FlagIcon /> },
  { to: "/transactions", label: "Transactions", icon: <ReceiptLongIcon /> },
  { to: "/report", label: "Report", icon: <BarChartIcon /> },
];

const secondary = [
  { to: "/settings", label: "Settings", icon: <SettingsIcon /> },
  { to: "/help", label: "Help", icon: <HelpOutlineIcon /> },
  { to: "/profile", label: "Profile", icon: <PersonOutlineIcon /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const renderList = (arr: typeof items) => (
    <List sx={{ px: 1 }}>
      {arr.map(({ to, label, icon }) => {
        const active = pathname === to;
        return (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            sx={{
              color: "white",
              mb: 0.5,
              borderRadius: 2,
              transition: "background-color 0.4s ease",
              "&:hover": {backgroundColor: "#1a4d4f"},
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "white", }}>{icon}</ListItemIcon>
            <ListItemText primary={label} 
            primaryTypographyProps={{
              fontFamily: "'Open Sans', sans-serif",
            }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );

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
        backgroundColor: "#052e30",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
      },
    }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography variant="h6" fontWeight={700}
        sx = {{
          color: "white",
          fontSize: "25px",
          mb: -2,
        }}>
          CASA
        </Typography>
      </Toolbar>
        {renderList(items as any)}
        <Divider sx={{ my: 1.5 }} />

        {renderList(secondary as any)}
      </Drawer>
  );
}
