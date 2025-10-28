import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
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
              mb: 0.5,
              borderRadius: 2,
              color: active ? "primary.contrastText" : "inherit",
              ...(active && {
                bgcolor: "primary.main",
                "& .MuiListItemIcon-root": { color: "primary.contrastText" },
              }),
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        );
      })}
    </List>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: 260,
        flexShrink: 0,
        bgcolor: "#1f87a2",
        color: "black",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography variant="h6" fontWeight={700}>
          CASA
        </Typography>
      </Toolbar>
      <Box
        sx={{ bgcolor: "white", color: "inherit", m: 2, borderRadius: 2, p: 1 }}
      >
        <Typography
          variant="subtitle2"
          sx={{ px: 2, py: 1, color: "text.secondary" }}
        >
          Main Menu
        </Typography>
        {renderList(items as any)}
        <Divider sx={{ my: 1.5 }} />
        <Typography
          variant="subtitle2"
          sx={{ px: 2, py: 1, color: "text.secondary" }}
        >
          General
        </Typography>
        {renderList(secondary as any)}
      </Box>
    </Box>
  );
}
