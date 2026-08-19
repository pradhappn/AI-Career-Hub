import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { appContent } from "../data/siteContent";
import { useEffect, useState } from "react";
import api from "../lib/api";

const { profile } = appContent;

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/user/profile")
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(() => setError("Your profile could not be loaded."));
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>{profile.title}</h1>
          <p>{error || profile.subtitle}</p>
          {user && (
            <div className="card profile-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <p>{user.skills?.join(", ") || "Add skills in Settings"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;