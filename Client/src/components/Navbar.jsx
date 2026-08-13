import "../styles/navbar.css";
import { appContent } from "../data/siteContent";

const { user } = appContent;

function Navbar() {
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