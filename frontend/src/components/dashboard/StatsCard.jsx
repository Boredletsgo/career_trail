import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatsCard = ({ icon: Icon, label, value, color = "#1976d2" }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {Icon && <Icon size={28} />}
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
