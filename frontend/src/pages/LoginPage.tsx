import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, TextField, Button, Alert, Box } from '@mui/material';
import { api, setToken, getToken } from '../api';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = getToken();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setMsg(null);
    try {
      const res = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (res?.token) {
        setToken(res.token);
        setMsg('Login successful.');
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>CASA</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 6 }}>
        {token ? (
          <Paper sx={{ p: 3, maxWidth: 520, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>Welcome</Typography>
            <Typography paragraph>You are logged in. This slimmed-down build intentionally includes only the login page.</Typography>
            <Button variant="outlined" onClick={() => { localStorage.removeItem('token'); location.reload(); }}>Log out</Button>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleLogin}>
              <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
              <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
            </Box>
          </Paper>
        )}
      </Container>
    </>
  );
}
