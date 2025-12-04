import React from "react";
import { Card, CardContent, Typography, IconButton, Box, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SkillCard = ({ skill, level, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 1.5,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Skill Details */}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {skill}
            </Typography>

            <Chip
              label={level}
              sx={{ mt: 1, background: "#1976d2", color: "#fff" }}
            />
          </Box>

          {/* Actions */}
          <Box>
            <IconButton color="primary" onClick={onEdit}>
              <EditIcon />
            </IconButton>

            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
