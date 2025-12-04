import api from "./axiosConfig";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

export const verifyToken = async () => {
  const res = await api.get("/auth/verify");
  return res.data;
};
