import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await registerUser(form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fa"
    }}>
      <Paper elevation={4} sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Create Your Account
        </Typography>

        <TextField
          fullWidth
          name="name"
          label="Full Name"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          label="Password"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : "Sign Up"}
        </Button>

        <Typography mt={2}>
          Already have an account?{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}
