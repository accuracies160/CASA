import { useState } from "react";
import { Typography, Box, Paper, Button, Stack, TextField, } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Box
        sx = {{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Paper
        elevation={3}
          sx = {{
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
          fontFamily ="'Open Sans', sans-serif" 
          textAlign="center"
          fontSize="28px"
          >
            Login
          </Typography>

          <Stack
          spacing = {2}
          >
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
            sx = {{
                borderRadius: 5
            }}
            >
                Login
            </Button>
          </Stack>
        </Paper>
        </Box>
    );
}