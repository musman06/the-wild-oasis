import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "@/components/DataItem/DataItem";
import Flag from "@/components/Flag/Flag";
import "./bookingdatabox.css";

import { formatDistanceFromNow, formatCurrency } from "@/utils/helpers";

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    start_date,
    end_date,
    number_nights,
    number_guests,
    cabin_price,
    extras_price,
    total_price,
    has_breakfast,
    observations,
    is_paid,
    guests: { full_name: guest_name, email, country, country_flag, nationalID },
    cabins: { name: cabin_name },
  } = booking;

  return (
    <section className="booking-data-box-container">
      <header className="booking-data-box-header">
        <div>
          <HiOutlineHomeModern />
          <p>
            {number_nights} nights in Cabin <span>{cabin_name}</span>
          </p>
        </div>

        <p>
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="booking-data-box-section">
        <div className="booking-data-box-guest">
          {country_flag && (
            <Flag src={country_flag} alt={`Flag of ${country}`} />
          )}
          <p>
            {guest_name}{" "}
            {number_guests > 1 ? `+ ${number_guests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {has_breakfast ? "Yes" : "No"}
        </DataItem>

        <div className={`booking-data-box-price ${is_paid}`}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(total_price)}

            {has_breakfast &&
              ` (${formatCurrency(cabin_price)} cabin + ${formatCurrency(
                extras_price,
              )} breakfast)`}
          </DataItem>

          <p>{is_paid ? "Paid" : "Will pay at property"}</p>
        </div>
      </section>

      <footer className="booking-data-box-footer">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
