import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import { getProfile, updateProfile } from "../../api/profile";

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    bio: "",
    location: "",
    experience: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile on load
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProfile();
      if (res?.success) {
        setProfile(res.data);
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleSave = async () => {
    setLoading(true);
    const res = await updateProfile(profile);
    setLoading(false);

    if (res?.success) {
      setIsEditing(false);
    }
  };

  return (
    <Card sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
      <CardContent>
        <Stack alignItems="center" spacing={2}>
          <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
            {profile.full_name?.charAt(0) || "U"}
          </Avatar>

          <Typography variant="h5" fontWeight={600}>
            User Profile
          </Typography>

          <Divider sx={{ width: "100%", my: 2 }} />

          <Stack spacing={2} width="100%">
            <TextField
              label="Full Name"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            <TextField
              label="Email Address"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled
              fullWidth
            />

            <TextField
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
              multiline
              rows={3}
            />

            <TextField
              label="Location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            <TextField
              label="Experience (years)"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            {!isEditing ? (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{ mt: 1 }}
              >
                Edit Profile
              </Button>
            ) : (
              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
