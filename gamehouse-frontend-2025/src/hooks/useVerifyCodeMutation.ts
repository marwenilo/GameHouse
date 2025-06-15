// hooks/useVerifyCodeMutation.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useVerify } from "../context/VerifyContext";
import { verifyCode } from "../api/verifyCode"; // assuming this is the correct path

type VerifyCodeArgs = {
  email: string;
  code: string;
};

/**
 * Props for useVerifyCodeMutation:
 * - @param onSuccessCallback - Optional callback with userId on success
 * - @param onErrorCallback - Optional callback with error message on failure
 */
export function useVerifyCodeMutation({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback?: (userId: string) => void;
  onErrorCallback?: (message: string) => void;
}) {
  const navigate = useNavigate();
  const { setVerifiedContext, setuserIdContext } = useVerify();

  const mutation = useMutation({
    mutationFn: ({ email, code }: VerifyCodeArgs) => verifyCode(email, code),

    onSuccess: (data) => {
      // Mark user as verified in context
      setVerifiedContext(true);
      // Clear any previous error
      onErrorCallback?.("");
      // Trigger success callback with userId
      onSuccessCallback?.(data.user_id);
      // Store userId in context
      setuserIdContext(data.user_id);
      // Navigate to products page with userId in state
      navigate("/products", { state: { userId: data.user_id } });
    },

    onError: (err: any) => {
      // Mark user as not verified on error
      setVerifiedContext(false);
      // Extract and report error message
      const message = err.response?.data?.error;
      onErrorCallback?.(message);
    },
  });

  return mutation;
}
