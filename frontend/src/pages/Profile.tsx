import { Typography, Box } from "@mui/material";

export default function Profile() {
  const displayName = localStorage.getItem("displayName");

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700}>
        Profile
      </Typography>

      <Typography variant="h5" mt={2}>
        Welcome, {displayName}
      </Typography>
    </Box>
  );
}