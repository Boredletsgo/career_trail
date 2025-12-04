import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from "@mui/material";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form.email, form.password);

      if (res?.token) {
        login(res.token, res.user);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    }
  };

  return (
    <Box
      sx={{
        width: 360,
        margin: "auto",
        mt: 10,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" fontWeight={600} mb={3}>
          Login to CareerTrail
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
