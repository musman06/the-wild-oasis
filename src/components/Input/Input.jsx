import { forwardRef } from "react";
import "./input.css";

const Input = forwardRef(
  (
    {
      type = "text",
      id,
      placeholder = "",
      defaultValue,
      disabled,
      onBlur,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        className="input-booking"
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
