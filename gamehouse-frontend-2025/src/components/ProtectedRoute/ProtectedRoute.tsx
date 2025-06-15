import { Navigate } from "react-router-dom";
import { useVerify } from "../../context/VerifyContext";
import type { JSX } from "react";

/**
 * Props for ProtectedRoute:
 * - @param children - The component(s) to render if verified
 */
export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isVerified } = useVerify();

  if (!isVerified) {
    // Redirect to home page if user is not verified
    return <Navigate to="/" replace />;
  }

  // Render the protected content if verified
  return children;
}
