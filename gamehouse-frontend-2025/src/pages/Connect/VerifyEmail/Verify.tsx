import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Button from "../../../components/Button/Button";
import PagesContainer from "../../../components/PagesContainer/PagesContainer";
import { motion } from "motion/react";
import styles from "../Connect.module.css";
import buttonStyles from "../../../components/Button/AnimatedButton.module.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEmailValidationMutation } from "../../../hooks/useEmailValidationMutation";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const mutation = useMutation({
    mutationFn: () =>
      axios.post("/api/validate-email", { email, code: code.join("") }),
    onSuccess: (res) => {
      setError("");
      navigate("/products", { state: { userId: res.data.user_id } });
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || "Invalid code or email");
    },
  });
  const resendMutation = useEmailValidationMutation({
    onErrorCallback: setError,
  });
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      setError("Please fill all 6 digits");
      return;
    }
    mutation.mutate();
  };

  useEffect(() => {
    if (countdown <= 0) {
      setResendEnabled(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    if (!resendEnabled) return;
    resendMutation.mutate(email);
    setCountdown(30);
    setResendEnabled(false);
  };
  return (
    <PagesContainer>
      <Button
        className={buttonStyles.modifButton}
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
        <h1 className={styles.title}>Get Verified!</h1>
        <p className={styles.subtitle}>
          Enter the one-time code we sent to:{" "}
          <span className={styles.email}>{email}</span>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.codeGroup}>
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

          {error && <div className={styles.error}>{error}</div>}

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
