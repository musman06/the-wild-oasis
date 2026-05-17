import "./buttonicon.css";

const ButtonIcon = ({ disabled, onClick, children }) => {
  return (
    <button className="button-icon" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonIcon;
