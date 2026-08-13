import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { appContent } from "../data/siteContent";

const { dashboard, user } = appContent;

function Dashboard() {
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