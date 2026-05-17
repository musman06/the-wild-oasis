import Heading from "../components/Heading/Heading";
import Row from "../components/Row/Row";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm/UpdateUserDataForm";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading Variant="h1" text="Update your account" />

      <Row type="vertical">
        <Heading Variant="h3" text="Update user data" />
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading Variant="h3" text="Update password" />
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
