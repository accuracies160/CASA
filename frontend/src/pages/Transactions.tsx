import { Typography, Box } from "@mui/material";
export default function Transactions() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800}>
          Transactions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Comprehensive view of your finances
        </Typography>
    </Box>
  );
}