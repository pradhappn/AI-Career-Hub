import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-analyzer" element={<ResumePage />} />
        <Route path="/interview-prep" element={<InterviewPage />} />
        <Route path="/study-assistant" element={<StudyAssistant />} />
        <Route path="/help-desk" element={<HelpDesk />} />
        <Route path="/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/career-mentor" element={<CareerMentor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;