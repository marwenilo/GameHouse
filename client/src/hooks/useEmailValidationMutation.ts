import { useMutation } from "@tanstack/react-query";
import { sendEmailValidationCode } from "../api/sendEmailValidationCode";
import { useNavigate } from "react-router-dom";

/**
 * Props for useEmailValidationMutation:
 * - @param onSuccessCallback - Optional callback called with email on success
 * - @param onErrorCallback - Optional callback called with error message on failure
 */
export function useEmailValidationMutation({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback?: (email: string) => void;
  onErrorCallback?: (message: string) => void;
}) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (email: string) => sendEmailValidationCode(email),

    onSuccess: (_data, email) => {
      // Clear any previous error message
      onErrorCallback?.("");
      if (onSuccessCallback) {
        onSuccessCallback(email);
        // Navigate to verify page, passing email in location state
        navigate("/verify", { state: { email } });
      }
    },

    onError: (err: any) => {
      // Extract error message from response and call error callback
      const error = err.response?.data?.error;
      onErrorCallback?.(error);
    },
  });

  return mutation;
}
