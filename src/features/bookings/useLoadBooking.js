import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "@/services/apiBookings";

const useLoadBooking = () => {
  const params = useParams();

  const bookingId = Number(params.bookingId);

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { isLoading, booking, error };
};

export default useLoadBooking;
