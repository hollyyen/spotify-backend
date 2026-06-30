import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Audience from "./pages/Audience";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="route-loading">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public marketing site */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Authenticated dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/dashboard/music" element={<ProtectedRoute><Music /></ProtectedRoute>} />
      <Route path="/dashboard/audience" element={<ProtectedRoute><Audience /></ProtectedRoute>} />
      <Route path="/dashboard/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
