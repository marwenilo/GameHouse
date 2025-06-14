import { api } from "./apiEntry";

export const verifyCode = async (email: string, code: string) => {
  const res = await api.post("/api/verify-code", {
    email,
    verification_code: code,
  });
  return res.data;
};
