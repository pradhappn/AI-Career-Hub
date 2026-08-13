import { useState } from "react";
import axios from "axios";
import "../styles/resume.css";

function ResumeAnalyzer() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {

    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );

      setAnalysis(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="resume-container">

      <div className="upload-card">

        <h2>Resume Analyzer</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button onClick={handleAnalyze}>
          Analyze Resume
        </button>

      </div>

      {loading && (
        <div className="loading">
          Analyzing Resume...
        </div>
      )}

      {analysis && (

        <div className="results">

          <div className="score-card">

            <h3>ATS Score</h3>

            <h1>
              {analysis.atsScore}%
            </h1>

          </div>

          <div className="result-card">

            <h3>Skills Found</h3>

            <ul>
              {analysis.skills?.map(
                (skill,index) => (
                  <li key={index}>
                    {skill}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="result-card">

            <h3>Missing Skills</h3>

            <ul>
              {analysis.missingSkills?.map(
                (skill,index) => (
                  <li key={index}>
                    {skill}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="result-card">

            <h3>Strengths</h3>

            <ul>
              {analysis.strengths?.map(
                (item,index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="result-card">

            <h3>Suggestions</h3>

            <ul>
              {analysis.suggestions?.map(
                (item,index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

          </div>

        </div>

      )}

    </div>
  );
}

export default ResumeAnalyzer;