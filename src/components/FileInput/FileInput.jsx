import { forwardRef } from "react";
import "./fileinput.css";

const FileInput = forwardRef(({ id, accept, isPending, ...props }, ref) => {
  return (
    <input
      type="file"
      className="file-input"
      id={id}
      accept={accept}
      disabled={isPending}
      ref={ref}
      {...props}
    />
  );
});

FileInput.displayName = "FileInput";

export default FileInput;
