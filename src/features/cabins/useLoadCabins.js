import { useQuery } from "@tanstack/react-query";
import getCabins from "@/services/apiCabins";

const useLoadCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
};

export default useLoadCabins;
