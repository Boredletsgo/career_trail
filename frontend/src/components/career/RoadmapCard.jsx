import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  IconButton,
  Stack,
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const RoadmapCard = ({ title, steps }) => {
  const [open, setOpen] = React.useState(true);

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <TimelineIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </Stack>

          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>

        <Collapse in={open}>
          <List>
            {steps?.map((step, idx) => (
              <React.Fragment key={idx}>
                <ListItem>
                  <ListItemText
                    primary={`Step ${idx + 1}`}
                    secondary={step}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                {idx < steps.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default RoadmapCard;
