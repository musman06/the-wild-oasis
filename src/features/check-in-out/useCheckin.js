import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "@/services/apiBookings";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingin, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked-in successfully`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Guest cannot be checked-in"),
  });

  return { isCheckingin, checkin };
};

export default useCheckin;
