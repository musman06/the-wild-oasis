import "./checkbox.css";

function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} style={{ cursor: "pointer" }}>
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
