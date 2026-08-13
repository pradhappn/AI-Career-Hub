import {
  FaHome,
  FaFileAlt,
  FaUserTie,
  FaBook,
  FaTools,
  FaRoad,
  FaUser,
  FaCog,
  FaBrain,
} from "react-icons/fa";

import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";
import { appContent } from "../data/siteContent";

const iconMap = {
  home: FaHome,
  file: FaFileAlt,
  user: FaUserTie,
  book: FaBook,
  tools: FaTools,
  road: FaRoad,
  brain: FaBrain,
  "user-profile": FaUser,
  settings: FaCog,
};

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">{appContent.brand}</h2>

      <ul>
        {appContent.sidebar.map((item) => {
          const Icon = iconMap[item.icon] || FaHome;

          return (
            <li key={item.path}>
              <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "") }>
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;