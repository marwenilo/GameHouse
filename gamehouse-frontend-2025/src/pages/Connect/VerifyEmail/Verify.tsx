import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import PagesContainer from "../../../components/PagesContainer/PagesContainer";
import { motion } from "motion/react";
import styles from "../Connect.module.css";
import buttonStyles from "../../../components/Button/AnimatedButton.module.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEmailValidationMutation } from "../../../hooks/useEmailValidationMutation";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useVerifyCodeMutation } from "../../../hooks/useVerifyCodeMutation";
import { useVerify } from "../../../context/VerifyContext";

export default function Verify() {
  const navigate = useNavigate();
  const { email } = useVerify();

  // Store each digit of the 6-digit verification code
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState(""); // Error message display
  const [countdown, setCountdown] = useState(30); // Timer for resend button
  const [resendEnabled, setResendEnabled] = useState(false); // Resend button enabled?

  // References to input fields for auto focus control
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Mutation for verifying the entered code
  const mutation = useVerifyCodeMutation({
    onErrorCallback: setError,
  });

  // Mutation to resend the verification code email
  const resendMutation = useEmailValidationMutation({
    onErrorCallback: setError,
  });

  // Handle input changes, allow only digits, auto-focus next input
  const handleChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    },
    [code]
  );

  // Submit the code for verification
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      setError("Please fill all 6 digits");
      return;
    }
    mutation.mutate({ email: email!, code: code.join("") });
  };

  // Countdown timer for enabling the resend button
  useEffect(() => {
    if (countdown <= 0) {
      setResendEnabled(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Trigger resend code mutation and reset timer
  const handleResend = () => {
    if (!resendEnabled) return;
    resendMutation.mutate(email!);
    setCountdown(30);
    setResendEnabled(false);
  };

  // Header shown only on mobile devices
  const header = useMemo(
    () => (
      <PageHeader
        title="Get Verified!"
        subtitle="Enter the one-time code we sent to:"
        highlight={email}
        className="mobileOnly"
      />
    ),
    [email]
  );

  // Reset code inputs if error occurs
  useEffect(() => {
    if (error) setCode(Array(6).fill(""));
  }, [error]);

  // Redirect to home if no email in context
  useEffect(() => {
    if (!email) navigate("/");
  }, [email]);

  return (
    <PagesContainer header={header}>
      {/* Back button to modify email */}
      <Button
        className={buttonStyles.backButton}
        onClick={() => navigate("/")}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <motion.span
          className={buttonStyles.arrow}
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 0 },
          }}
        >
          <FaArrowLeft />
        </motion.span>
        <span className={buttonStyles.text}>Modify Email</span>
      </Button>

      <div className={styles.formBox}>
        {/* Header for desktop */}
        <PageHeader
          title="Get Verified!"
          subtitle="Enter the one-time code we sent to:"
          highlight={email}
          className="desktopOnly"
        />

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.codeGroup}>
            {/* Render 6 inputs for verification code digits */}
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputsRef.current[i] = el!;
                }}
                onChange={(e) => handleChange(e.target.value, i)}
                className={styles.codeInput}
              />
            ))}
          </div>

          {/* Show error if any */}
          {error && <div className="error">{error}</div>}

          {/* Resend code section */}
          <p className={styles.resend}>
            Didn't get an email?{" "}
            <Button
              type="button"
              className={styles.resendLink}
              disabled={!resendEnabled}
              onClick={handleResend}
            >
              {resendEnabled ? "Resend Code" : `Resend Code (${countdown}s)`}
            </Button>
          </p>

          {/* Submit button with loading state */}
          <Button
            disabled={mutation.isPending}
            type="submit"
            style={{ backgroundColor: "#beb4f5", color: "#16141e" }}
          >
            {mutation.isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </PagesContainer>
  );
}
