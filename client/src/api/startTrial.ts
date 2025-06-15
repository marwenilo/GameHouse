import { api } from "./apiEntry";

export const startTrial = async (userId: number, planId: string) => {
  const res = await api.post("/api/start-trial", {
    user_id: userId,
    plan_id: planId,
  });
  return res.data;
};