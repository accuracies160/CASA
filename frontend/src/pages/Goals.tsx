import { Typography, Box, Paper, Button } from "@mui/material";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";

export default function Goals() {
  const updateFundsButton = (
    <Button
          sx ={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "2",
            mt: 1,
            "&:hover": {backgroundColor: "#006B01"},
          }}
          >
            Update funds
          </Button>
  );

  return (
    <Box 
    sx = {{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
    >
      <Box
      sx = {{
        flex: 3,
      }}
      >
        <Typography variant="h4" fontWeight="bold">
        Goals
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Track your progress toward your financial goals.
        </Typography>

        <Button
        sx = {{
          mt: -2,
          mb: 3,
          backgroundColor: "green",
          color: "white",
          borderRadius: "2",
          "&:hover": {backgroundColor: "#006B01"},
        }}
        >
          Add goal
        </Button>

        <Paper
          sx = {{
            maxWidth: "40%",
            p: 3,
            mb: 3,
            borderRadius: "16px",
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" fontWeight="bold"  fontFamily ="'Open Sans', sans-serif">
            Emergency fund
          </Typography>
          <ProgressBar current={2500} target={5000} color="#3CA0CA" />
          {updateFundsButton}
        </Paper>

        <Paper
          sx = {{
            maxWidth: "40%",
            p: 3,
            mb: 3,
            borderRadius: "16px",
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" fontWeight="bold" fontFamily ="'Open Sans', sans-serif">
            New Car
          </Typography>
          <ProgressBar current={8000} target={20000} color="#3CA0CA" />
          {updateFundsButton}
        </Paper>

        <Paper
          sx = {{
            maxWidth: "40%",
            p: 3,
            mb: 3,
            borderRadius: "16px",
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" fontWeight="bold" fontFamily ="'Open Sans', sans-serif">
            Vacation
          </Typography>
          <ProgressBar current={800} target={3600} color="#3CA0CA" />
          {updateFundsButton}
        </Paper>
      </Box>
    </Box>
    
  );
}