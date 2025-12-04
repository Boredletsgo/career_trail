Explanation of Key Folders
1. /api — All API calls

These files talk to your Flask backend.

Example inside /api/auth.js:

import api from "./axiosConfig";

export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

2. /components — Reusable UI blocks

Example:

<LoginForm />

<SignupForm />

<SkillCard />

<RecommendationCard />

3. /context/AuthContext.jsx

Stores JWT token + user data.

4. /pages — Full screens

Each page uses components + calls API.

5. /routes.jsx — App navigation