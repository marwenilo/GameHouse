import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendEmailValidationCode } from "../../api/sendEmailValidationCode";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import styles from "./Connect.module.css";
import PagesContainer from "../../components/PagesContainer/PagesContainer";

const Connect = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [wantsMarketing, setWantsMarketing] = useState(true);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => sendEmailValidationCode(email),
    onSuccess: () => {
      setError("");
      navigate("/verify", { state: { email } });
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }
    mutation.mutate();
  };
  return (
    <PagesContainer>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Connect Your Account</h1>
        <p className={styles.subtitle}>...and unlock your benefits!</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={wantsMarketing}
              onChange={() => setWantsMarketing(!wantsMarketing)}
            />
            Send Me Offers, News, and Fun Stuff!
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <Button
            disabled={mutation.isPending}
            type="submit"
            style={{ backgroundColor: "#beb4f5", color: "#16141e" }}
          >
            {mutation.isPending ? "Sending..." : "Connect"}
          </Button>
        </form>
      </div>
    </PagesContainer>
  );
};

export default Connect;
