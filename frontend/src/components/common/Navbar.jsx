import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1200, background: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          CareerTrail
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography>{user?.name || "User"}</Typography>

          <Avatar>{user?.name?.[0]}</Avatar>

          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
