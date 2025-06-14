import { useLocation } from "react-router-dom";
import styles from "./PagesContainer.module.css";
import checkIcon from "../../assets/check.svg";

export default function PagesContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const path = location.pathname;

  const isConnectPage = path === "/";
  const isVerifyPage = path === "/verify";
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {/* Left side */}
        <div className={styles.features}>
          {(isConnectPage || isVerifyPage) && (
            <>
              {[
                "Access to 100+ GAMES for FREE thanks to ads",
                "Log In Across All Your Devices",
                "Skip the Line with Customer Support",
              ].map((text, i) => (
                <div key={i} className={styles.featureItem}>
                  <img src={checkIcon} alt="✔" className={styles.checkIcon} />
                  <span>{text}</span>
                </div>
              ))}
            </>
          )}

          {/* Show disclaimer only on the first page */}
          {isConnectPage && (
            <p className={styles.disclaimer}>
              By continuing, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </p>
          )}
        </div>

        {children}
      </div>
    </main>
  );
}
