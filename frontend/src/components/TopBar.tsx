import { Box, Stack, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

export default function TopBar() {
const navigate = useNavigate();

    return (
    <Box
      sx = {{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
          sx = {{
            backgroundColor: "#fffff",
            boxShadow: 1,
            "&:hover": {backgroundColor: "#f5f5f5"},
          }}
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            sx = {{
              backgroundColor: "#fffff",
              boxShadow: 1,
              "&:hover": {backgroundColor: "#f5f5f5"},
            }}
            >
              <NotificationsNoneIcon />
          </IconButton>

          <IconButton
            onClick = {() => navigate("/login")}
            sx = {{
              backgroundColor: "#fffff",
              boxShadow: 1,
              "&:hover": {backgroundColor: "#f5f5f5"},
            }}
            >
              <AccountCircle />
          </IconButton>
        </Stack>
      </Box>
    );
}