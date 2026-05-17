import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signUp as signUpApi } from "@/services/apiAuth";

const useSignUp = () => {
  const { isPending: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "User created successfully! Please verify the new account from the user's email address",
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isSigningUp, signUp };
};

export default useSignUp;
