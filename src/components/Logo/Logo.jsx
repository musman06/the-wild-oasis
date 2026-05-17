import { useDarkMode } from "@/context/DarkModeContext";
import "./logo.css";

function Logo() {
  const { isDarkMode } = useDarkMode();
  const imageSrc = isDarkMode ? "logo-dark.png" : "logo-light.png";
  return (
    <div className="logo">
      <img src={imageSrc} alt="Logo" />
    </div>
  );
}

export default Logo;
