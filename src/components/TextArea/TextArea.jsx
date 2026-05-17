import { forwardRef } from "react";
import "./textarea.css";

const Textarea = forwardRef(
  ({ id, defaultValue = "", disabled, ...props }, ref) => {
    return (
      <textarea
        className="text-area"
        id={id}
        defaultValue={defaultValue}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
