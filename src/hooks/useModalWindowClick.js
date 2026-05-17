import { useEffect, useRef } from "react";

const useModalWindowClick = (closeModalWindowFn, capturePhase) => {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        closeModalWindowFn();
      }
    }

    document.addEventListener("click", handleClick, capturePhase);

    return () =>
      document.removeEventListener("click", handleClick, capturePhase);
  }, [closeModalWindowFn, ref]);

  return ref;
};

export default useModalWindowClick;
