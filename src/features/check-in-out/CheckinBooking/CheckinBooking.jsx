import { useState } from "react";

import BookingDataBox from "../../bookings/BookingDataBox/BookingDataBox";
import Row from "@/components/Row/Row";
import Heading from "@/components/Heading/Heading";
import ButtonGroup from "@/components/ButtonGroup/ButtonGroup";
import Button from "@/components/Button/Button";
import ButtonText from "@/components/ButtonText/ButtonText";
import useLoadBooking from "../../bookings/useLoadBooking";
import Spinner from "@/components/Spinner/Spinner";
import Checkbox from "@/components/Checkbox/Checkbox";
import "./checkinbooking.css";

import { useMoveBack } from "@/hooks/useMoveBack";
import { formatCurrency } from "@/utils/helpers";
import useCheckin from "../useCheckin";
import useLoadSettings from "@/features/settings/useLoadSettings";

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading, booking, error } = useLoadBooking();
  const { isCheckingin, checkin } = useCheckin();
  const {
    isLoading: isLoadingSettings,
    settings,
    error: errorSettings,
  } = useLoadSettings();
  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const optionalBreakfastPrice =
    settings.breakfast_price * booking.number_guests * booking.number_nights;

  function handleCheckin() {
    if (addBreakfast) {
      checkin({
        bookingId: booking.id,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: booking.total_price + booking.extras_price,
        },
      });
    } else {
      checkin({ bookingId: booking.id });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading Variant="h1" text={`Check in booking #${booking.id}`} />
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {!error ? (
        <BookingDataBox booking={booking} />
      ) : (
        <p style={{ fontWeight: 500 }}>Booking details cannot be loaded</p>
      )}

      {errorSettings ? (
        <p style={{ fontWeight: 500 }}>
          Optional breakfast cannot be added at the moment
        </p>
      ) : (
        !booking.has_breakfast && (
          <div className="checkin-booking-confirm">
            <Checkbox
              id="add-breakfast"
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((breakfast) => !breakfast);
                setConfirmPayment((confirm) => !confirm);
              }}
            >
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
              ?
            </Checkbox>
          </div>
        )
      )}

      <div className="checkin-booking-confirm">
        <Checkbox
          id="confirm-payment"
          checked={confirmPayment}
          disabled={confirmPayment || isCheckingin}
          onChange={() => setConfirmPayment((confirm) => !confirm)}
        >
          {addBreakfast
            ? `I confirm that ${booking.guests.full_name} has paid the total amount of 
          (${formatCurrency(booking.total_price + optionalBreakfastPrice)} 
          ${formatCurrency(booking.total_price)} +
            ${formatCurrency(optionalBreakfastPrice)})
          `
            : `I confirm that ${booking.guests.full_name} has paid the total amount of 
          ${formatCurrency(booking.total_price)}`}
        </Checkbox>
      </div>

      <ButtonGroup>
        <Button
          variation="primary"
          text={`Check in booking #${booking.id}`}
          disabled={!confirmPayment || isCheckingin}
          onClick={handleCheckin}
        />
        <Button
          variation="secondary"
          size="large"
          text="Back"
          onClick={moveBack}
        />
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
