import "./buttontext.css";

const ButtonText = ({ onClick, children }) => {
  return (
    <button className="button-text" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonText;
