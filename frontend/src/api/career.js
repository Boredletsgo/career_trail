import api from "./axiosConfig";

// Fetch all available skills
export const fetchAllSkills = async () => {
  const res = await api.get("/skills/list");
  return res.data;
};

// Fetch user's added skills
export const fetchUserSkills = async () => {
  const res = await api.get("/skills/user");
  return res.data;
};

// Add a new skill for the user
export const addUserSkill = async (skillData) => {
  const res = await api.post("/skills/add", skillData);
  return res.data;
};

// Update an existing skill rating
export const updateUserSkill = async (skillId, rating) => {
  const res = await api.put(`/skills/update/${skillId}`, { rating });
  return res.data;
};

// Delete a skill from user profile
export const deleteUserSkill = async (skillId) => {
  const res = await api.delete(`/skills/delete/${skillId}`);
  return res.data;
};
