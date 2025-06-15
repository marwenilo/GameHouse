import { api } from "./apiEntry";

export const verifyCode = async (email: string, code: string) => {
  const res = await api.post("/api/validate-email", {
    email,
    code: code,
  });
  return res.data;
};
