import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { useMemo, useState } from "react";
import { appContent } from "../data/siteContent";
import api from "../lib/api";

const { helpDesk } = appContent;

function HelpDesk() {
  const [query, setQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const articles = useMemo(
    () => helpDesk.articles.filter((article) => article.question.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const askSupport = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await api.post("/support/ask", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer(error.response?.data?.message || "Support assistant unavailable.");
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
          <h1>{helpDesk.title}</h1>
          <p>{helpDesk.subtitle}</p>
          <input className="help-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={helpDesk.search} />
          <div className="cards">
            {articles.map((article) => (
              <article className="card" key={article.question}>
                <h3>{article.question}</h3>
                <p>{article.answer}</p>
              </article>
            ))}
          </div>
          <div className="card support-assistant">
            <h2>Ask AI support</h2>
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about using AI Career Hub" />
            <button onClick={askSupport} disabled={loading}>{loading ? "Thinking..." : "Ask support"}</button>
            {answer && <p>{answer}</p>}
          </div>
          <a className="primary-btn" href="mailto:support@aicareerhub.example">{helpDesk.contact}</a>
        </div>
      </div>
    </div>
  );
}

export default HelpDesk;
