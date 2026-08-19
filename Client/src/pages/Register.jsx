import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/register.css";
import { appContent } from "../data/siteContent";
import api from "../lib/api";

const { auth } = appContent;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{auth.registerTitle}</h1>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder={auth.placeholder.fullName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder={auth.placeholder.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={auth.placeholder.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>{auth.registerButton}</button>

        <p>
          {auth.loginPrompt}
          <Link to="/login">{auth.loginButton}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;