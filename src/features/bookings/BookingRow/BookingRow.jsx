import { HiEye, HiTrash } from "react-icons/hi";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import Tag from "@/components/Tag/Tag";
import Table from "@/components/Table/Table";
import Menus from "@/components/Menus/Menus";
import Modal from "@/components/Modal/Modal";
import ConfirmDelete from "@/components/ConfirmDelete/ConfirmDelete";
import "./bookingrow.css";

import { formatDistanceFromNow, formatCurrency } from "@/utils/helpers";
import useCheckout from "@/features/check-in-out/useCheckout";
import useDeleteBooking from "../useDeleteBooking";

function BookingRow({ booking }) {
  const { isCheckingout, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const {
    id: bookingId,
    start_date: startDate,
    end_date: endDate,
    number_nights: numNights,
    total_price: totalPrice,
    status,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <div className="booking-row-cabin-column">{cabinName}</div>

      <div className="booking-row-stacked">
        <span>{guestName}</span>
        <span>{email}</span>
      </div>

      <div className="booking-row-stacked">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <div className="booking-row-amount">{formatCurrency(totalPrice)}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle menuId={bookingId} />
            <Menus.List menuId={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`${bookingId}`)}
              >
                Show details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}

              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  disabled={isCheckingout}
                  onClick={() => checkout(bookingId)}
                >
                  Check out
                </Menus.Button>
              )}

              {/* DELETE BUTTON */}
              <Modal.OpenButton opensWindow="delete-booking">
                <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
              </Modal.OpenButton>
            </Menus.List>

            {/* DELETE PROMPT */}
            <Modal.Window windowType="delete-booking">
              <ConfirmDelete
                resourceName={`Booking #${bookingId}`}
                disabled={isDeleting}
                onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
