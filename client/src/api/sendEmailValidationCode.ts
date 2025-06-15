import { api } from "./apiEntry";

export const sendEmailValidationCode = async (email: string) => {
  const res = await api.get("/api/send-email", { params: { email } });
  return res.data;
};
