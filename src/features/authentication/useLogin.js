import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "@/services/apiAuth";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isSigningIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isSigningIn, login };
};

export default useLogin;
