import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
          Welcome Back 👋
        </Typography>

        <TextField
          fullWidth
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : "Login"}
        </Button>

        <Typography mt={2}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}
