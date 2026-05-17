import { useForm } from "react-hook-form";

import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import Input from "@/components/Input/Input";
import "./signupform.css";

import useSignUp from "../useSignUp";

function SignupForm() {
  const { isSigningUp, signUp } = useSignUp();
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmission({ email, password, fullName }) {
    signUp(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmission)}>
      <div className="form-row">
        <label className="form-input-label" htmlFor="fullName">
          Full name
        </label>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Name must be 3 characters long",
            },
          })}
        />
        {errors?.fullName?.message && (
          <span className="form-input-error ">{errors?.fullName?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="email">
          Email address
        </label>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors?.email?.message && (
          <span className="form-input-error ">{errors?.email?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="password">
          Password (min 8 characters)
        </label>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be 8 characters long",
            },
          })}
        />
        {errors?.password?.message && (
          <span className="form-input-error ">{errors?.password?.message}</span>
        )}
      </div>

      <div className="form-row">
        <label className="form-input-label" htmlFor="passwordConfirm">
          Repeat password
        </label>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (p) => {
              return p === getValues().password || "Password is not equal";
            },
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
          variation="secondary"
          type="reset"
          text="Cancel"
          disabled={isSigningUp}
        />
        <Button
          variation="primary"
          text="Create new user"
          disabled={isSigningUp}
        />
      </div>
    </Form>
  );
}

export default SignupForm;
