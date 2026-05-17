import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";

import Modal from "@/components/Modal/Modal";
import CreateCabinForm from "../CreateCabinForm/CreateCabinForm";
import ConfirmDelete from "@/components/ConfirmDelete/ConfirmDelete";
import Table from "@/components/Table/Table";
import Menus from "@/components/Menus/Menus";
import "./cabinrow.css";

import useCreateCabin from "../useCreateCabin";
import useDeleteCabin from "../useDeleteCabin";
import { formatCurrency } from "@/utils/helpers";

const CabinRow = ({ cabin }) => {
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
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
    <Table.Row>
      <div>
        <img className="cabinrow-image" src={image} />
      </div>
      <div className="cabinrow-row">{name}</div>
      <div className="cabinrow-row">Fits upto {max_capacity} persons</div>
      <div className="cabinrow-price">{formatCurrency(regular_price)}</div>
      <div className="cabinrow-discount">{formatCurrency(discount)}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle menuId={cabinId} />

            <Menus.List menuId={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
              >
                Duplicate
              </Menus.Button>

              <Modal.OpenButton opensWindow="cabin-edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.OpenButton>

              <Modal.OpenButton opensWindow="cabin-delete-prompt">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.OpenButton>
            </Menus.List>

            <Modal.Window windowType="cabin-edit-form">
              <CreateCabinForm editCabinData={cabin} />
            </Modal.Window>

            <Modal.Window windowType="cabin-delete-prompt">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
