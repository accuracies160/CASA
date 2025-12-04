import { useState } from "react";
import { Typography, Box, Paper, Button, Stack, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
      });

      const text = await res.text();
      setMessage(text);

      if (res.ok) {
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
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
          Create Account
        </Typography>

        {/* First Name */}
        <Stack spacing={2}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

        {/* Last Name */}
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* Sign up Button */}
          <Button
          type="submit"
          variant="contained"
          fullWidth
          sx = {{ borderRadius: 5}}
          >
            Sign Up
          </Button>


          <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
            Already have an account?{" "}
            <Link component="button" onClick={() => navigate("/login")}>
              Login
            </Link>
          </Typography>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
