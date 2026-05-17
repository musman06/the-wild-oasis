import "./button.css";

const Button = ({
  text,
  variation,
  size,
  type,
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      className={`button ${variation} ${size}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
