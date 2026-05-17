import Button from "../Button/Button";
import Heading from "../Heading/Heading";

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  closeModalWindow,
}) {
  return (
    <div className="confirm-delete">
      <Heading Variant="h3" text={`Delete ${resourceName}`} />
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          text="Cancel"
          variation="secondary"
          disabled={disabled}
          onClick={closeModalWindow}
        />
        <Button
          text="Delete"
          variation="danger"
          disabled={disabled}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
}

export default ConfirmDelete;
