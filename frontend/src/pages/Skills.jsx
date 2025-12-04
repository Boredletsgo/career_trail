import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Autocomplete,
  TextField
} from "@mui/material";
import {
  getAllSkills,
  getUserSkills,
  updateUserSkills,
} from "../api/skills";

export default function SkillsPage() {
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load skills from API
  const loadSkills = async () => {
    try {
      const [allRes, userRes] = await Promise.all([
        getAllSkills(),
        getUserSkills(),
      ]);

      setAllSkills(allRes.data.skills || []);
      setSelectedSkills(userRes.data.skills || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load skills.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserSkills(selectedSkills.map((s) => s.id));
      alert("Skills updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update skills.");
    }
    setSaving(false);
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Skills Management
      </Typography>

      <Typography variant="subtitle1" color="gray" mb={3}>
        Select the skills you have experience in.
      </Typography>

      <Card elevation={3} sx={{ borderRadius: 4, p: 2, mb: 4 }}>
        <CardContent>

          {/* Autocomplete Multi Select */}
          <Autocomplete
            multiple
            options={allSkills}
            getOptionLabel={(option) => option.skill}
            value={selectedSkills}
            onChange={(e, newValue) => setSelectedSkills(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Search Skills" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.skill}
                  {...getTagProps({ index })}
                  color="primary"
                />
              ))
            }
          />

          {/* Save Button */}
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Skills"}
            </Button>
          </Box>

        </CardContent>
      </Card>

      {/* Selected Skills Display */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Your Skills
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1}>
        {selectedSkills.length === 0 ? (
          <Typography color="gray">No skills selected yet.</Typography>
        ) : (
          selectedSkills.map((skill) => (
            <Chip key={skill.id} label={skill.skill} color="secondary" />
          ))
        )}
      </Box>
    </Box>
  );
}
