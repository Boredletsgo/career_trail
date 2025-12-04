import api from "./axiosConfig";

// Dashboard Summary
export const fetchDashboardSummary = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data;
};

// User activities
export const fetchRecentActivities = async () => {
  const res = await api.get("/dashboard/activities");
  return res.data;
};

// Stats (skills count, AI uses, logs count)
export const fetchDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};
