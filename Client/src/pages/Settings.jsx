import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import "../styles/settings.css";
import { appContent } from "../data/siteContent";

const { settings } = appContent;

function Settings() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: "",
  });

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put("http://localhost:5000/api/auth/update", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile Updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>{settings.title}</h1>

          <div className="settings-card">
            <input
              type="text"
              placeholder={settings.placeholders.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="text"
              placeholder={settings.placeholders.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            <textarea
              placeholder={settings.placeholders.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />

            <button onClick={updateProfile}>{settings.saveButton}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;