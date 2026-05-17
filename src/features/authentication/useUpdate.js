import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser as updateCurrentUserApi } from "@/services/apiAuth";

const useUpdate = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCurrentUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCurrentUser };
};

export default useUpdate;
