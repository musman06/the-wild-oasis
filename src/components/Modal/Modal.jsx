import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

import useModalWindowClick from "@/hooks/useModalWindowClick";
import "./modal.css";

const ModalContext = createContext();

function Modal({ children }) {
  const [openWindowName, setOpenWindowName] = useState("");
  const openWindowFn = setOpenWindowName;
  const closeWindowFn = () => setOpenWindowName("");

  return (
    <ModalContext.Provider
      value={{ openWindowName, setOpenWindowName, openWindowFn, closeWindowFn }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function OpenButton({ opensWindow, children }) {
  const { openWindowFn } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => openWindowFn(opensWindow),
  });
}

const Window = ({ windowType, children }) => {
  const { openWindowName, closeWindowFn } = useContext(ModalContext);
  const ref = useModalWindowClick(closeWindowFn, true);

  if (windowType !== openWindowName) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container" ref={ref}>
        <button className="modal-button" onClick={closeWindowFn}>
          <HiXMark />
        </button>
        {cloneElement(children, {
          closeModalWindow: closeWindowFn,
        })}
      </div>
    </div>,
    document.body,
  );
};

Modal.OpenButton = OpenButton;
Modal.Window = Window;

export default Modal;
