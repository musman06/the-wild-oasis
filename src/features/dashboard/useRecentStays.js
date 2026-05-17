import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";

import { getStaysAfterDate as getStaysAfterDateApi } from "@/services/apiBookings";

const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const lastDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), lastDays).toISOString();

  const { isLoading, data: staysData } = useQuery({
    queryKey: ["stays", `last-${lastDays}`],
    queryFn: () => getStaysAfterDateApi(queryDate),
  });

  return { isLoading, staysData, lastDays };
};

export default useRecentStays;
