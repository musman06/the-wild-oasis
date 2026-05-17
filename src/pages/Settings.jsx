import Row from "@/components/Row/Row";
import Heading from "@/components/Heading/Heading";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row type="vertical">
      <Heading Variant="h1" text="Update Hotel Settings" />
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
