import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResumeAnalyzer from "../components/Resume";
import "../styles/dashboard.css";

function ResumePage() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <ResumeAnalyzer />
        </div>
      </div>
    </div>
  );
}

export default ResumePage;
