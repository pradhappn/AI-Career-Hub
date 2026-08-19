import { useState } from "react";
import "../styles/interviewPrep.css";
import { appContent } from "../data/siteContent";
import api from "../lib/api";

const { interview } = appContent;

function InterviewPrep() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!role) return alert("Please select a role");
    try {
      setLoading(true);
      const res = await api.post("/interview/generate", { role });
      setQuestions(res.data.questions || []);
      setCurrentQuestion(0);
      setEvaluation(null);
      setAnswer("");
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    try {
      setLoading(true);
      const res = await api.post("/interview/evaluate", {
        question: questions[currentQuestion],
        answer,
      });
      setEvaluation(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to evaluate answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-container">
      <div className="interview-header">
        <h1>{interview.title}</h1>
        <p>{interview.subtitle}</p>
      </div>

      <div className="interview-body">
        <div className="controls">
          <label>
            {interview.roleLabel}
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">{interview.selectRole}</option>
              {interview.roles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button onClick={generateQuestions} disabled={loading}>
            {loading ? interview.generating : interview.generateQuestions}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="question-area">
            <h3>{questions[currentQuestion]}</h3>

            <textarea
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={interview.placeholder}
            />

            <div className="question-actions">
              <button
                onClick={() => setCurrentQuestion((i) => Math.max(0, i - 1))}
                disabled={currentQuestion === 0}
              >
                {interview.previous}
              </button>

              <button
                onClick={() =>
                  setCurrentQuestion((i) => Math.min(questions.length - 1, i + 1))
                }
                disabled={currentQuestion === questions.length - 1}
              >
                {interview.next}
              </button>

              <button onClick={submitAnswer} disabled={loading || !answer}>
                {loading ? interview.submitting : interview.submit}
              </button>
            </div>
          </div>
        )}

        {evaluation && (
          <div className="evaluation">
            <h2>
              {interview.scoreTitle}: {evaluation.score}/10
            </h2>
            <p>{evaluation.feedback}</p>
            <h4>{interview.strengthsTitle}</h4>
            <ul>
              {evaluation.improvements?.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPrep;