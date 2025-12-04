import api from "./axiosConfig";

// Fetch logged-in user profile
export const fetchUserProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};

// Update profile details
export const updateUserProfile = async (formData) => {
  const res = await api.put("/profile/update", formData);
  return res.data;
};

// Change password
export const updatePassword = async (oldPassword, newPassword) => {
  const res = await api.put("/profile/password", {
    oldPassword,
    newPassword,
  });
  return res.data;
};
