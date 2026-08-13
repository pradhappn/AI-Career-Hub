import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function HelpDesk() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Help Desk</h1>
          <p>Support articles and contact options will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default HelpDesk;
