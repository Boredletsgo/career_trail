import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Career from "./pages/Career";
import Roadmap from "./pages/Roadmap";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/common/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/skills",
    element: (
      <ProtectedRoute>
        <Skills />
      </ProtectedRoute>
    ),
  },

  {
    path: "/career",
    element: (
      <ProtectedRoute>
        <Career />
      </ProtectedRoute>
    ),
  },

  {
    path: "/roadmap",
    element: (
      <ProtectedRoute>
        <Roadmap />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

export default router;
