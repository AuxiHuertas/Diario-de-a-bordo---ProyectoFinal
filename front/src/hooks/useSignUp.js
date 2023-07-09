import { useMutation } from "react-query";
import { useLocation } from "wouter";
import { auth } from "../services";

export const useSignUp = () => {
  const [, setLocation] = useLocation();

  const { mutate } = useMutation({
    mutationFn: auth.signUp,
    onSuccess: (response) => {
      if (response.success) setLocation("/login");
    },
  });
  return mutate;
};
