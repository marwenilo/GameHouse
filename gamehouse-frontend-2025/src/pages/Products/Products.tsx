import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { getPlans } from "../../api/getPlans";
import { startTrial } from "../../api/startTrial";
import PagesContainer from "../../components/PagesContainer/PagesContainer";
import Button from "../../components/Button/Button";
import styles from "./Products.module.css";
import checkIcon from "../../assets/check.svg";
import getSymbolFromCurrency from "currency-symbol-map";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "year">("year");
  const [error, setError] = useState("");

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const mutation = useMutation({
    mutationFn: () => startTrial(userId, selectedPlan),
    onSuccess: () => {
      navigate("/congrats");
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || "Failed to start trial");
    },
  });

  if (isLoading || !data)
    return <p className={styles.loadingProducts}>Loading...</p>;
  if (fetchError)
    return <p className={styles.loadingProducts}>Error loading plans.</p>;

  const handleStartTrial = () => {
    if (!userId) return alert("Missing user ID");
    mutation.mutate();
  };

  return (
    <PagesContainer>
      <div className={styles.wrapperProducts}>
        <h1 className={styles.titleProducts}>Choose your plan</h1>

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
                <div className={`${styles.cardProducts}`}>
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

        <p className={styles.cancelProducts}>Cancel anytime.</p>

        {error && <p className={styles.errorProducts}>{error}</p>}

        <Button
          onClick={handleStartTrial}
          disabled={mutation.isPending}
          className={styles.ctaProducts}
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
