import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { appContent } from "../data/siteContent";

const { auth } = appContent;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{auth.loginTitle}</h1>

        {error && <p className="error-message">{error}</p>}

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

        <button onClick={loginUser}>{auth.loginButton}</button>

        <p>
          {auth.registerPrompt}
          <Link to="/register">{auth.registerButton}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;