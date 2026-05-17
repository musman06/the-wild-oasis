import HeaderMenu from "../HeaderMenu/HeaderMenu";
import UserAvatar from "@/features/authentication/UserAvatar/UserAvatar";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
};

export default Header;
