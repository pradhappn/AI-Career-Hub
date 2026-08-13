import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InterviewPrep from "../components/InterviewPrep";
import "../styles/dashboard.css";

function InterviewPage() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <InterviewPrep />
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
