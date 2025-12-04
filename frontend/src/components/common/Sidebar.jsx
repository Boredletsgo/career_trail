import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menu = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Skills", icon: <SchoolIcon />, path: "/skills" },
    { text: "Career Path", icon: <WorkIcon />, path: "/career" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 230,
        [`& .MuiDrawer-paper`]: { width: 230, background: "#f5f6fa", paddingTop: "64px" },
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            selected={pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon sx={{ color: pathname === item.path ? "#1976d2" : "#333" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: pathname === item.path ? 700 : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
