import { api } from "./apiEntry";

export type PlanType = {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  trial_days: number;
};

export const getPlans = async (): Promise<{
  monthly: PlanType;
  year: PlanType;
}> => {
  const res = await api.get("/api/products");
  return res.data;
};
