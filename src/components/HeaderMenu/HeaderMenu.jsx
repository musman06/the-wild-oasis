import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import Logout from "@/features/authentication/Logout/Logout";
import "./headermenu.css";

const HeaderMenu = () => {
  const navigate = useNavigate();

  return (
    <ul className="header-menu">
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
};

export default HeaderMenu;
