import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import FileInput from "@/components/FileInput/FileInput";
import Form from "@/components/Form/Form";
import Input from "@/components/Input/Input";
import "./updateuserdataform.css";

import useUser from "../useUser";
import useUpdate from "../useUpdate";

function UpdateUserDataForm() {
  // we don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { isUpdating, updateCurrentUser } = useUpdate();

  const { register, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: user.user_metadata,
  });
  const { errors, isDirty } = formState;

  function onSubmission({ fullName, avatar }) {
    console.log(avatar);
    const avatarFile = typeof avatar === "string" ? null : avatar?.[0];

    updateCurrentUser({ fullName, avatarFile });
    console.log(fullName);
    console.log(avatarFile);
  }

  // to show updated user data on successful updation of data
  useEffect(() => {
    if (user) reset(user.user_metadata);
  }, [user, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmission)}>
      <div className="form-row">
        <label className="form-input-label" htmlFor="email">
          Email address
        </label>
        <Input id="email" type="email" disabled={true} {...register("email")} />
        {errors?.email?.message && (
          <span className="form-input-error ">{errors?.email?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="fullName">
          Full name
        </label>
        <Input
          id="fullName"
          type="text"
          disabled={isUpdating}
          {...register("fullName", {
            minLength: {
              value: 3,
              message: "Name must be 3 characters long",
            },
            onBlur: (e) => {
              const trimmedValue = e.target.value.trim();
              setValue("fullName", trimmedValue, { shouldDirty: true });
            },
          })}
        />
        {errors?.fullName?.message && (
          <span className="form-input-error ">{errors?.fullName?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="avatar">
          Avatar image
        </label>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          {...register("avatar", {})}
        />
        {errors?.avatar?.message && (
          <span className="form-input-error ">{errors?.avatar?.message}</span>
        )}
      </div>

      <div className="form-row">
        <Button
          type="button"
          variation="secondary"
          text="Cancel"
          onClick={() => reset()}
          disabled={isUpdating}
        />
        <Button
          variation="primary"
          text="Update account"
          disabled={isUpdating || !isDirty}
        />
      </div>
    </Form>
  );
}

export default UpdateUserDataForm;
