import { useNavigate, useParams } from "react-router-dom";

import BookingDataBox from "../BookingDataBox/BookingDataBox";
import Row from "@/components/Row/Row";
import Heading from "@/components/Heading/Heading";
import Tag from "@/components/Tag/Tag";
import ButtonGroup from "@/components/ButtonGroup/ButtonGroup";
import Button from "@/components/Button/Button";
import ButtonText from "@/components/ButtonText/ButtonText";
import Spinner from "@/components/Spinner/Spinner";
import Empty from "@/components/Empty/Empty";
import "./bookingdetail.css";

import { useMoveBack } from "@/hooks/useMoveBack";
import useLoadBooking from "../useLoadBooking";
import useCheckout from "@/features/check-in-out/useCheckout";

function BookingDetail() {
  const { isLoading, booking, error } = useLoadBooking();
  const { isCheckingout, checkout } = useCheckout();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking)
    return <Empty resourceName={`booking with ID ${params.bookingId}`} />;

  return (
    <>
      <Row type="horizontal">
        <div className="booking-detail-heading">
          <Heading Variant="h1" text={`Booking #${booking.id}`} />
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {!error ? (
        <BookingDataBox booking={booking} />
      ) : (
        <p style={{ fontWeight: 500 }}>Booking details cannot be loaded</p>
      )}

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button
            variation="primary"
            text={`Check-in booking #${booking.id}`}
            onClick={() => navigate(`/checkin/${booking.id}`)}
          />
        )}

        {booking.status === "checked-in" && (
          <Button
            variation="primary"
            text={`Check-out booking #${booking.id}`}
            onClick={() => checkout(booking.id)}
            disabled={isCheckingout}
          />
        )}

        <Button variation="secondary" text="Back" onClick={moveBack} />
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
