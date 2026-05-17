import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "@/services/apiBookings";

const useCheckout = () => {
  const queryClient = useQueryClient();

  const { isPending: isCheckingout, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked-out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Guest cannot be checked-out"),
  });

  return { isCheckingout, checkout };
};

export default useCheckout;
