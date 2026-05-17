import LoginForm from "@/features/authentication/LoginForm/LoginForm";
import Logo from "@/components/Logo/Logo";
import Heading from "@/components/Heading/Heading";
import "./login.css";

function Login() {
  return (
    <main className="login-layout">
      <Logo />
      <Heading Variant="h4" text="Login to your account" />
      <LoginForm />
    </main>
  );
}

export default Login;
