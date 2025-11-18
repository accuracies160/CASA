import { useState } from "react";
import { Typography, Box, Paper, Button, Stack, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          displayName,
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

        <Stack spacing={2}>
          <TextField
            label="Display Name"
            fullWidth
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 5 }}
            onClick={async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password, displayName})
            });

            const text = await res.text();
            alert(text);
            } catch (err) {
            alert("Error connecting to server");
            }
            }}
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
