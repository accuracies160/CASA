import { Typography, Box } from "@mui/material";
export default function Budgets() {
  return (
    <Box>
        <Typography variant="h4" fontWeight={800}>
          Budgets
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back! Here’s your financial summary
        </Typography>
      </Box>
  );
}