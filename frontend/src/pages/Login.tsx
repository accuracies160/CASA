import { useState } from "react";
import { Typography, Box, Paper, Button, Stack, TextField } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const message = await res.text();
        const displayName = message.replace("Login successful for user: ", "");

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("displayName", displayName);

        window.location.href = "/dashboard";
        return;
      }

      const text = await res.text();
      setMessage(text);

    } catch (err) {
      setMessage("Error connecting to server");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          fontFamily="'Open Sans', sans-serif"
          textAlign="center"
          fontSize="28px"
        >
          Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ borderRadius: 5 }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
            onClick={() => window.location.href = "/signup"}
          >
          Don’t have an account? <span style={{ color: "#1976d2" }}>Sign up</span>
          </Typography>

        </Stack>

        <Typography mt={2} textAlign="center">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
}
