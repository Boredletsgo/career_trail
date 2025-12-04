import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const AddSkillModal = ({
  open,
  onClose,
  skillOptions = [],
  defaultSkill = "",
  defaultLevel = "",
  onSave,
}) => {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    setSkill(defaultSkill);
    setLevel(defaultLevel);
  }, [defaultSkill, defaultLevel, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {defaultSkill ? "Update Skill" : "Add Skill"}
        </Typography>

        {/* Skill Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Skill</InputLabel>
          <Select value={skill} label="Select Skill" onChange={(e) => setSkill(e.target.value)}>
            {skillOptions.map((s) => (
              <MenuItem key={s.id} value={s.skill}>
                {s.skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Skill Level Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Skill Level</InputLabel>
          <Select
            value={level}
            label="Skill Level"
            onChange={(e) => setLevel(e.target.value)}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
            <MenuItem value="Expert">Expert</MenuItem>
          </Select>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => onSave({ skill, level })}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddSkillModal;
