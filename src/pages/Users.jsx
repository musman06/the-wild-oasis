import SignUpForm from "@/features/authentication/SignUpForm/SignUpForm";
import Heading from "../components/Heading/Heading";

function NewUsers() {
  return (
    <>
      <Heading Variant="h1" text="Create a new user" />
      <SignupForm />
    </>
  );
}

export default NewUsers;
