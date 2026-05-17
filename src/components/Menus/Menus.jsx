import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

import useModalWindowClick from "@/hooks/useModalWindowClick";
import "./menus.css";

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openMenuId, setOpenMenuId] = useState("");
  const [position, setPosition] = useState(null);

  const openMenu = setOpenMenuId;
  const closeMenu = () => setOpenMenuId("");

  return (
    <MenusContext.Provider
      value={{
        openMenuId,
        setOpenMenuId,
        openMenu,
        closeMenu,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Menu = ({ children }) => {
  return <div className="menu-container">{children}</div>;
};

const Toggle = ({ menuId }) => {
  const { openMenuId, openMenu, closeMenu, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openMenuId === "" || openMenuId !== menuId) {
      openMenu(menuId);
    } else {
      closeMenu();
    }
  }

  return (
    <button className="menus-toggle-button" onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
};

const List = ({ menuId, children }) => {
  const { openMenuId, closeMenu, position } = useContext(MenusContext);
  const ref = useModalWindowClick(closeMenu, false);

  if (openMenuId !== menuId) return null;

  return createPortal(
    <ul
      className="menus-list"
      style={{ top: position.y, right: position.x }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
};

const Button = ({ icon, disabled, onClick, children }) => {
  const { closeMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <li>
      <button
        className="menus-list-button"
        disabled={disabled}
        onClick={handleClick}
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
