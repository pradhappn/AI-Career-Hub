import "../styles/navbar.css";
import { appContent } from "../data/siteContent";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || appContent.user;
  } catch {
    return appContent.user;
  }
};

function Navbar() {
  const user = getStoredUser();

  return (
    <div className="navbar-top">
      <input type="text" placeholder="Search..." />

      <div className="profile">
        <img src={user.avatar} alt={user.name} />
        <span>{user.name}</span>
      </div>
    </div>
  );
}

export default Navbar;