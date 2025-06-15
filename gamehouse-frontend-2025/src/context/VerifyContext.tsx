import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type VerifyContextType = {
  email: string | null;
  isVerified: boolean;
  userId: string | null;
  setEmailContext: (email: string) => void;
  setVerifiedContext: (status: boolean) => void;
  setuserIdContext: (userId: string) => void;
  logout: () => void;
};

const VerifyContext = createContext<VerifyContextType | undefined>(undefined);

/**
 * Props for VerifyProvider:
 * - @param children - React nodes wrapped by this provider
 */
export function VerifyProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setuserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Setters to update context state
  const setEmailContext = (email: string) => setEmailState(email);
  const setVerifiedContext = (status: boolean) => setIsVerified(status);
  const setuserIdContext = (userId: string) => setuserId(userId);

  // Clear auth info and redirect to home on logout
  const logout = () => {
    setEmailState(null);
    setIsVerified(false);
    setuserId(null);
    navigate("/");
  };

  return (
    <VerifyContext.Provider
      value={{
        email,
        isVerified,
        setEmailContext,
        setVerifiedContext,
        userId,
        setuserIdContext,
        logout,
      }}
    >
      {children}
    </VerifyContext.Provider>
  );
}

// Custom hook to access VerifyContext safely
export const useVerify = () => {
  const context = useContext(VerifyContext);
  if (!context) throw new Error("useVerify must be used within VerifyProvider");
  return context;
};
