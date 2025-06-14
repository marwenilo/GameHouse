import { useMutation } from "@tanstack/react-query";
import { sendEmailValidationCode } from "../api/sendEmailValidationCode";
import { useNavigate } from "react-router-dom";

export function useEmailValidationMutation({
  onSuccessRedirect = true,
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessRedirect?: boolean;
  onSuccessCallback?: (email: string) => void;
  onErrorCallback?: (message: string) => void;
}) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (email: string) => sendEmailValidationCode(email),
    onSuccess: (_data, email) => {
      onErrorCallback?.(""); // clear errors
      if (onSuccessCallback) {
        onSuccessCallback(email);
      } else if (onSuccessRedirect) {
        navigate("/verify", { state: { email } });
      }
    },
    onError: (err: any) => {
      const error = err.response?.data?.error || "Something went wrong";
      onErrorCallback?.(error);
    },
  });

  return mutation;
}
