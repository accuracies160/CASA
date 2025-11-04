import { Typography, Box, Paper, Button } from "@mui/material";
import ProgressBar from "../components/ProgressBar";

export default function Goals() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Goals
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Track your progress toward your financial goals.
        </Typography>

        <Button
        sx = {{
          mt: -3,
          mb: 2,
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
          <ProgressBar current={8000} target={20000} color="green" />
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
          <ProgressBar current={800} target={3600} color="yellow" />
        </Paper>
    </Box>
    
  );
}