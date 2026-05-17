import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";

import { getBookingsAfterDate as getBookingsAfterDateApi } from "@/services/apiBookings";

const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const lastDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), lastDays).toISOString();

  const { isLoading, data: salesData } = useQuery({
    queryKey: ["bookings", `last-${lastDays}`],
    queryFn: () => getBookingsAfterDateApi(queryDate),
  });

  return { isLoading, salesData };
};

export default useRecentBookings;
