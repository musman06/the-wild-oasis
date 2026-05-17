import { useState } from "react";

import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import SpinnerMini from "@/components/SpinnerMini/SpinnerMini";
import "./loginform.css";

import useLogin from "../useLogin";

function LoginForm() {
  const { isSigningIn, login } = useLogin();
  const [email, setEmail] = useState("usman@example.com");
  const [password, setPassword] = useState("pass1998");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <Form type="regular" onSubmit={handleSubmit}>
      <div className="login-form-row">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-form-row">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-form-row">
        <Button size="large" variation="primary">
          {!isSigningIn ? "Login" : <SpinnerMini />}
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
