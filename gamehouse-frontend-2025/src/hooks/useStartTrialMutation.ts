// hooks/useStartTrialMutation.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { startTrial } from "../api/startTrial";

/**
 * Props for useStartTrialMutation:
 * - @param userId - ID of the user starting the trial
 * - @param selectedPlan - The chosen plan: "year" or "monthly"
 * - @param onErrorCallback - Optional callback for error messages
 */
export function useStartTrialMutation({
  userId,
  selectedPlan,
  onErrorCallback,
}: {
  userId: number;
  selectedPlan: "year" | "monthly";
  onErrorCallback?: (message: string) => void;
}) {
  const navigate = useNavigate();

  const mutation = useMutation({
    // Call API with userId and selected plan
    mutationFn: () => startTrial(userId, selectedPlan),

    // On success, navigate to congrats page
    onSuccess: () => {
      navigate("/congrats");
    },

    // On error, extract message and call error callback if provided
    onError: (err: any) => {
      const message = err.response?.data?.error;
      onErrorCallback?.(message);
    },
  });

  return mutation;
}
