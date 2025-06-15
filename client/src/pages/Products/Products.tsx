import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { getPlans } from "../../api/getPlans";
import PagesContainer from "../../components/PagesContainer/PagesContainer";
import Button from "../../components/Button/Button";
import styles from "./Products.module.css";
import checkIcon from "../../assets/check.svg";
import getSymbolFromCurrency from "currency-symbol-map";
import buttonStyles from "../../components/Button/AnimatedButton.module.css";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa6";
import { useStartTrialMutation } from "../../hooks/useStartTrialMutation";
import { useVerify } from "../../context/VerifyContext";

export default function Products() {
  const navigate = useNavigate();
  const { userId } = useVerify();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "year">("year");
  const [error, setError] = useState("");

  // Fetch plans data
  const { data } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  // Mutation to start trial
  const mutation = useStartTrialMutation({
    userId: Number(userId),
    selectedPlan,
    onErrorCallback: setError,
  });

  const handleStartTrial = () => {
    if (!userId) {
      alert("Missing user ID");
      return;
    }
    mutation.mutate();
  };
  const planCards = useMemo(() => {
    if (!data) return null;
    return (
      <div className={styles.cardsProducts}>
        {(["year", "monthly"] as const).map((key) => {
          const plan = data[key];
          const isSelected = selectedPlan === key;

          return (
            <div
              key={key}
              className={`${styles.cardWrapperProducts} ${
                isSelected
                  ? styles.selectedWrapperProducts
                  : styles.unSelectedWrapperProducts
              }`}
              onClick={() => setSelectedPlan(key)}
            >
              <div className={styles.cardProducts}>
                <div className={styles.headerWrapProducts}>
                  <div className={styles.iconWrapProducts}>
                    {isSelected ? (
                      <img
                        src={checkIcon}
                        alt="check"
                        className={styles.checkIconProducts}
                      />
                    ) : (
                      <div className={styles.emptyCircleProducts} />
                    )}
                  </div>
                  <div className={styles.planTitleProducts}>
                    {key === "year" ? "Annual" : "Monthly"}
                  </div>
                </div>

                {key === "year" && (
                  <div className={styles.badgeProducts}>Save 20%</div>
                )}

                <div className={styles.planNameProducts}>
                  {getSymbolFromCurrency(plan.currency)}
                  {plan.price} / {key === "year" ? "year" : "month"}
                </div>

                <div className={styles.billingProducts}>
                  {key === "year" ? "Billed annually" : "Billed monthly"}
                </div>

                <div className={styles.trialProducts}>
                  {plan.trial_days}-day free trial
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [data, selectedPlan]);
  return (
    <PagesContainer>
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

      <div className={styles.wrapperProducts}>
        <h1 className={styles.titleProducts}>Choose your plan</h1>
        {planCards}
        <p className={styles.cancelProducts}>Cancel anytime.</p>
        {error && <p className="error">{error}</p>}
        <Button
          onClick={handleStartTrial}
          disabled={mutation.isPending}
          style={{ backgroundColor: "#ffd966", color: "#16141e" }}
        >
          {mutation.isPending ? "Starting..." : "Start my free trial!"}
        </Button>
        <div className={styles.footerLinksProducts}>
          <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a> ·{" "}
          <a href="#">Restore Purchase</a>
        </div>
      </div>
    </PagesContainer>
  );
}
