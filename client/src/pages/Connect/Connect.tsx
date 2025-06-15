import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Connect.module.css";
import PagesContainer from "../../components/PagesContainer/PagesContainer";
import { useEmailValidationMutation } from "../../hooks/useEmailValidationMutation";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useVerify } from "../../context/VerifyContext";

const Connect = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [wantsMarketing, setWantsMarketing] = useState(true);
  const { setEmailContext } = useVerify();

  // Mutation hook to send validation code to email
  const mutation = useEmailValidationMutation({
    onErrorCallback: setError,
    onSuccessCallback: (email) => {
      setEmailContext(email);
      setError(""); // Clear any previous errors on success
    },
  });

  // Validate email format (basic) before submitting
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }
    mutation.mutate(email);
  };

  const header = (
    <PageHeader
      title="Connect Your Account"
      subtitle="...and unlock your benefits!"
      className="mobileOnly"
    />
  );

  return (
    <PagesContainer header={header}>
      <div className={styles.formBox}>
        <PageHeader
          title="Connect Your Account"
          subtitle="...and unlock your benefits!"
          className="desktopOnly"
        />
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
          {error && <div className="error">{error}</div>}
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
