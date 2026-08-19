import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { appContent } from "../data/siteContent";
import { useState } from "react";

const { dashboard } = appContent;

function Dashboard() {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || appContent.user;
    } catch {
      return appContent.user;
    }
  });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>{dashboard.greeting.replace("{name}", user.name)}</h1>
          <p>{dashboard.welcome}</p>

          <div className="cards">
            {dashboard.stats.map((item) => (
              <div className="card" key={item.title}>
                <h3>{item.title}</h3>
                <h2>{item.value}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;