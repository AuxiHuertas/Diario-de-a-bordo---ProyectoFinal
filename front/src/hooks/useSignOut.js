import { useMutation, useQueryClient } from "react-query";
import { auth } from "../services";

export const useSignOut = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: auth.signOut,
    onSuccess: (response) => {
      if (response.success)
      queryClient.setQueryData('user', null);
      queryClient.removeQueries();
    },
  });
  return mutate;
};