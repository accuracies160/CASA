import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Profile() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  /* ---------------- Pop Up Panel ---------------- */
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700}>
        Profile
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 2,
        }}
      >
        {/* LEFT PANEL */}
        <Paper
          sx={{
            width: "fit-content",
            flexShrink: 0,
            p: 3,
            borderRadius: "16px",
            boxShadow: 5,
          }}
        >
          <Typography variant="h5" mb={1}>
            Welcome, {firstName}
          </Typography>

          <Divider />

          <Stack direction="column" spacing={1} alignItems="flex-start" mt={2}>
            <Button
              fullWidth
              sx={{
                textTransform: "none",
                px: 1.5,
                height: "50px",
                color: "#000",
              }}
              onClick={() => setSelectedPanel("profile")}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                  }}
                >
                  <PersonOutlineIcon />
                  <Typography>My Profile</Typography>
                </Box>

                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </Box>
            </Button>

            {/* Add more buttons here later */}
          </Stack>
        </Paper>

        {/* RIGHT PANEL — Only shows when selected */}
        {selectedPanel === "profile" && (
          <Paper
            sx={{
              width: "40%",
              p: 3,
              borderRadius: "16px",
              boxShadow: 5,
            }}
          >
            <Typography variant="h5" mb={1}>
              My Profile
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1">
              Name: {firstName} {lastName}
            </Typography>

            <Divider sx={{ mt: 1 }} />

            <Typography variant="body1" mt={1}>
              Email: {email}
            </Typography>

            <Divider sx={{ mt: 1 }} />
          </Paper>
        )}
      </Box>
    </Box>
  );
}
