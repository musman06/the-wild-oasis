import SignupForm from "@/features/authentication/SignUpForm/SignupForm";
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
