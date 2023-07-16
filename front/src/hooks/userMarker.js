import { useMutation,useQueries,useQueryClient } from "react-query";
import { useLocation } from "wouter";
import { auth } from "../services";

export const userMarker = () => {
  const  queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: auth.marker,
    onSuccess: (response) => {
      if (response.success)
 queryClient.invalidateQueries({ queryKey : ["user"]});
    },
  });
  return mutate;
};

export const userMarkerEdit = () => {
  const  queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: auth.editMarker,
    onSuccess: (response) => {
      if (response.success)
 queryClient.invalidateQueries({ queryKey : ["user"]});
    },
  });
  return mutate;
};

export const userMarkerDelete = () => {
  const  queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: auth.deleteMarker,
    onSuccess: (response) => {
      if (response.success)
 queryClient.invalidateQueries({ queryKey : ["user"]});
    },
  });
  return mutate;
};

