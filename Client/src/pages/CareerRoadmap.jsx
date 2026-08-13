import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import "../styles/careerRoadmap.css";
import { appContent } from "../data/siteContent";

const { roadmap } = appContent;

function CareerRoadmap() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateRoadmap = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (resume) formData.append("resume", resume);
      formData.append("role", role);
      formData.append("skills", skills);

      const response = await axios.post(
        "http://localhost:5000/api/roadmap/analyze",
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="roadmap-container">
            <div className="roadmap-header">
              <h1>{roadmap.title}</h1>
              <p>{roadmap.subtitle}</p>
            </div>

            <div className="input-card">
              <input
                type="text"
                placeholder={roadmap.targetRole}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <textarea
                placeholder={roadmap.currentSkills}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button onClick={generateRoadmap}>{roadmap.analyzeButton}</button>
            </div>

            {loading && <div className="loading">{roadmap.loading}</div>}

            {result && (
              <>
                <div className="score-section">
                  <div className="score-card">
                    <h3>{roadmap.skillMatch}</h3>
                    <h1>{result.skillMatch}%</h1>
                  </div>

                  <div className="score-card">
                    <h3>{roadmap.jobReadiness}</h3>
                    <h1>{result.jobReadiness}%</h1>
                  </div>
                </div>

                <div className="result-grid">
                  <div className="result-card">
                    <h3>{roadmap.missingSkills}</h3>
                    <ul>
                      {result.missingSkills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="result-card">
                    <h3>{roadmap.recommendedProjects}</h3>
                    <ul>
                      {result.projects?.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="roadmap-card">
                  <h2>{roadmap.learningRoadmap}</h2>
                  {result.roadmap?.map((step, index) => (
                    <div key={index} className="roadmap-step">
                      <span>{index + 1}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerRoadmap;