import React from "react";
import { Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material";

const ActivityCard = ({ title = "Recent Activity", activities = [] }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>

        <List sx={{ maxHeight: 240, overflowY: "auto" }}>
          {activities.length > 0 ? (
            activities.map((act, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ display: "block" }}>
                  <Typography variant="body1" fontWeight={500}>
                    {act.activity_type}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {act.description}
                  </Typography>

                  <Typography variant="caption" color="gray">
                    {act.created_at}
                  </Typography>
                </ListItem>

                {index !== activities.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No activity found.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
