import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { appContent } from "../data/siteContent";

const { profile } = appContent;

function Profile() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>{profile.title}</h1>
          <p>{profile.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;