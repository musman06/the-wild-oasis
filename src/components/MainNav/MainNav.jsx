import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

import "./mainnav.css";

const MainNav = () => {
  return (
    <nav>
      <ul className="mainnav-links-list">
        <NavLink className="mainnav-link" to="/dashboard">
          <HiOutlineHome />
          <span>Home</span>
        </NavLink>
        <NavLink className="mainnav-link" to="/bookings">
          <HiOutlineCalendarDays />
          <span>Bookings</span>
        </NavLink>
        <NavLink className="mainnav-link" to="/cabins">
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </NavLink>
        <NavLink className="mainnav-link" to="/users">
          <HiOutlineUsers />
          <span>Users</span>
        </NavLink>
        <NavLink className="mainnav-link" to="/settings">
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </NavLink>
      </ul>
    </nav>
  );
};

export default MainNav;
