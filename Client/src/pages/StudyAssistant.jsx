import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import "../styles/studyAssistant.css";
import { appContent } from "../data/siteContent";

const { study } = appContent;

function StudyAssistant() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studyData, setStudyData] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  const handleGenerate = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("notes", file);
      const res = await axios.post(
        "http://localhost:5000/api/study/generate",
        formData
      );
      setStudyData(res.data);
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
          <div className="study-container">
            <div className="study-header">
              <h1>{study.title}</h1>
              <p>{study.subtitle}</p>
            </div>

            <div className="upload-card">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button onClick={handleGenerate}>{study.generateButton}</button>
            </div>

            {loading && <div className="loading">{study.loading}</div>}

            {studyData && (
              <>
                <div className="tabs">
                  {study.tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())}>
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "summary" && (
                  <div className="content-card">
                    <h2>{study.summaryTitle}</h2>
                    <p>{studyData.summary}</p>
                  </div>
                )}

                {activeTab === "mcqs" && (
                  <div className="content-card">
                    <h2>{study.tabs[1]}</h2>
                    {studyData.mcqs?.map((item, index) => (
                      <div className="mcq-card" key={index}>
                        <h4>
                          Q{index + 1}. {item.question}
                        </h4>
                        {item.options?.map((option, i) => (
                          <p key={i}>{option}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "flashcards" && (
                  <div className="flashcards">
                    {studyData.flashcards?.map((card, index) => (
                      <div className="flashcard" key={index}>
                        <h4>{card.question}</h4>
                        <p>{card.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "quiz" && (
                  <div className="content-card">
                    <h2>{study.quizTitle}</h2>
                    {studyData.quiz?.map((question, index) => (
                      <div key={index} className="quiz-card">
                        <h4>{question.question}</h4>
                        {question.options?.map((option, i) => (
                          <label key={i}>
                            <input type="radio" name={`q${index}`} />
                            {option}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyAssistant;
