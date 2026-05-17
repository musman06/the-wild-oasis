import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";

import CreateCabinForm from "../CreateCabinForm/CreateCabinForm";
import Modal from "@/components/Modal/Modal";
import ConfirmDelete from "@/components/ConfirmDelete/ConfirmDelete";
import "./cabinrow.css";

import useDeleteCabin from "../useDeleteCabin";
import { formatCurrency } from "@/utils/helpers";
import useCreateCabin from "../useCreateCabin";

const CabinRow = ({ cabin }) => {
  // const [showEditForm, setShowEditForm] = useState(false);
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinID,
    image,
    name,
    max_capacity,
    regular_price,
    discount,
    description,
  } = cabin;

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <div className="cabinrow">
      <div>
        <img className="cabinrow-image" src={image} />
      </div>
      <div className="cabinrow-row">{name}</div>
      <div className="cabinrow-row">Fits upto {max_capacity} persons</div>
      <div className="cabinrow-price">{formatCurrency(regular_price)}</div>
      <div className="cabinrow-discount">{formatCurrency(discount)}</div>
      <div>
        <button disabled={isCreating} onClick={handleDuplicateCabin}>
          <HiSquare2Stack />
        </button>
        {
          <Modal>
            <Modal.OpenButton opensWindow="cabin-edit-form">
              <button>
                <HiPencil />
              </button>
            </Modal.OpenButton>
            <Modal.Window windowType="cabin-edit-form">
              <CreateCabinForm editCabinData={cabin} />
            </Modal.Window>
          </Modal>
        }

        {
          <Modal>
            <Modal.OpenButton opensWindow="cabin-delete-prompt">
              <button className="cabinrow-button">
                <HiTrash />
              </button>
            </Modal.OpenButton>
            <Modal.Window windowType="cabin-delete-prompt">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(cabinID)}
              />
            </Modal.Window>
          </Modal>
        }
      </div>
    </div>
  );
};

export default CabinRow;
