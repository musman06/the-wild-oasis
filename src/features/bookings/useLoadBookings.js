import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getAllBookings } from "@/services/apiBookings";
import { PAGE_SIZE } from "@/utils/constants";

const useLoadBookings = () => {
  const queryClient = useQueryClient();

  // FILTER
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status") ?? "all";
  const filterName = "status";

  // PAGINATION
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, currentPage],
    queryFn: () => getAllBookings(filterName, filterValue, "eq", currentPage),
  });

  // PRE-FETCHING
  const pagesCount = Math.ceil(count / PAGE_SIZE);

  // // Next page pre-fetching
  if (currentPage < pagesCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, currentPage + 1],
      queryFn: () =>
        getAllBookings(filterName, filterValue, "eq", currentPage + 1),
    });
  }

  // // previous page pre-fetching
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, currentPage - 1],
      queryFn: () =>
        getAllBookings(filterName, filterValue, "eq", currentPage - 1),
    });
  }

  return { isLoading, bookings, count, error };
};

export default useLoadBookings;
