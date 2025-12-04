import React from "react";
import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";

const RecommendationCard = ({ title, matchScore, skills }) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          <WorkIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Stack>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Match Score: <b>{matchScore}%</b>
        </Typography>

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Needed Skills:
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {skills?.map((skill, idx) => (
            <Chip key={idx} label={skill} variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
