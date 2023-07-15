import { useMutation,useQueries,useQueryClient } from "react-query";
import { useLocation } from "wouter";
import { auth } from "../services";

export const userMarket = () => {
  const  queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: auth.market,
    onSuccess: (response) => {
      if (response.success)
 queryClient.invalidateQueries({ queryKey : ["user"]});
    },
  });
  return mutate;
};
