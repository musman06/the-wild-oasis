import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import CreateCabinForm from "../CreateCabinForm/CreateCabinForm";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.OpenButton opensWindow="cabin-create-form">
        <Button
          text="Create Cabin"
          variation="primary"
          size="medium"
          type="button"
        />
      </Modal.OpenButton>
      <Modal.Window windowType="cabin-create-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
