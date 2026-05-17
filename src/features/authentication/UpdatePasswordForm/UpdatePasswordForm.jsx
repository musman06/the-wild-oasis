import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Input from "@/components/Input/Input";
import "./updatepasswordform.css";

import useUpdate from "../useUpdate";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateCurrentUser, isUpdating } = useUpdate();

  function onSubmit({ password }) {
    updateCurrentUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label className="form-input-label" htmlFor="password">
          New Password (min 8 char)
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password?.message && (
          <span className="form-input-error ">{errors?.password?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="passwordConfirm">
          Confirm password
        </label>
        <Input
          id="passwordConfirm"
          type="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm?.message && (
          <span className="form-input-error ">
            {errors?.passwordConfirm?.message}
          </span>
        )}
      </div>

      <div className="form-row">
        <Button
          onClick={() => reset()}
          type="button"
          variation="secondary"
          text="Cancel"
        />
        <Button
          variation="primary"
          text="Update password"
          disabled={isUpdating}
        />
      </div>
    </Form>
  );
}

export default UpdatePasswordForm;
