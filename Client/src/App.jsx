import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumePage from "./pages/ResumePage";
import InterviewPage from "./pages/InterviewPage";
import StudyAssistant from "./pages/StudyAssistant";
import HelpDesk from "./pages/HelpDesk";
import CareerRoadmap from "./pages/CareerRoadmap";
import CareerMentor from "./pages/CareerMentor";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function ProtectedRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/resume-analyzer" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
        <Route path="/interview-prep" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
        <Route path="/study-assistant" element={<ProtectedRoute><StudyAssistant /></ProtectedRoute>} />
        <Route path="/help-desk" element={<ProtectedRoute><HelpDesk /></ProtectedRoute>} />
        <Route path="/career-roadmap" element={<ProtectedRoute><CareerRoadmap /></ProtectedRoute>} />
        <Route path="/career-mentor" element={<ProtectedRoute><CareerMentor /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;