
import { useMutation,useQueryClient } from "react-query";
import { img } from "../services";

export const userPict = () => {
  const  queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: img.picture,
    onSuccess: (response) => {
      if (response.success)
 queryClient.invalidateQueries({ queryKey : ["user"]});
    },
  });
  return mutate;
};