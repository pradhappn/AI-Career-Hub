import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import "../styles/careerMentor.css";
import { appContent } from "../data/siteContent";

const { mentor } = appContent;

function CareerMentor() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const askMentor = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const userMessage = { type: "user", text: question };
      setMessages((prev) => [...prev, userMessage]);

      const response = await axios.post(
        "http://localhost:5000/api/mentor/ask",
        { question }
      );

      const aiMessage = { type: "ai", text: response.data.answer };
      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");
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
          <div className="mentor-container">
            <div className="mentor-header">
              <h1>{mentor.title}</h1>
              <p>{mentor.subtitle}</p>
            </div>

            <div className="chat-box">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={message.type === "user" ? "user-message" : "ai-message"}
                >
                  {message.text}
                </div>
              ))}

              {loading && <div className="ai-message">{mentor.thinking}</div>}
            </div>

            <div className="input-area">
              <textarea
                placeholder={mentor.placeholder}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <button onClick={askMentor}>{mentor.send}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerMentor;