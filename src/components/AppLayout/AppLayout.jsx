import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./applayout.css";

const AppLayout = () => {
  return (
    <div className="app-layout-outer">
      <Sidebar />

      <div className="app-layout-inner">
        <Header />
        <main className="app-layout-main">
          <div className="app-layout-outlet-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
