import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import "../styles/settings.css";
import { appContent } from "../data/siteContent";
import api from "../lib/api";

const { settings } = appContent;

function Settings() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: "",
  });

  useEffect(() => {
    api.get("/user/profile").then(({ data }) => setForm({
      name: data.name || "",
      role: data.role || "",
      skills: data.skills?.join(", ") || "",
    })).catch(() => {});
  }, []);

  const updateProfile = async () => {
    try {
      const response = await api.put("/auth/update", form);
      localStorage.setItem("user", JSON.stringify(response.data));

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