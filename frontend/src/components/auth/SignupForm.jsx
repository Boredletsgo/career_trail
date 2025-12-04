import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  MenuItem
} from "@mui/material";
import { signupUser } from "../../api/auth";

const experienceOptions = [
  "Fresher",
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5+ years"
];

const SignupForm = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    experience_level: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await signupUser(form);

      if (res?.message) {
        setSuccess("Account created! You can now log in.");
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <Box
      sx={{
        width: 380,
        margin: "auto",
        mt: 8,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" fontWeight={600} mb={3}>
          Create Your Account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            margin="normal"
            value={form.full_name}
            onChange={handleChange}
            required
          />

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

          <TextField
            fullWidth
            select
            label="Experience Level"
            name="experience_level"
            margin="normal"
            value={form.experience_level}
            onChange={handleChange}
          >
            {experienceOptions.map((exp) => (
              <MenuItem key={exp} value={exp}>
                {exp}
              </MenuItem>
            ))}
          </TextField>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupForm;
