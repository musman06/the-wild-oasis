import Logo from "../Logo/Logo";
import MainNav from "../MainNav/MainNav";
import Uploader from "@/data/Uploader";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Logo />
      <MainNav />

      {/* <Uploader /> */}
    </aside>
  );
};

export default Sidebar;
