import { useLocation } from "react-router-dom";
import styles from "./PagesContainer.module.css";
import checkIcon from "../../assets/check.svg";
import { motion } from "framer-motion";

/**
 * Props for PagesContainer:
 * - @param children - Optional React nodes inside the container
 * - @param header - Optional header content, shown on Connect and Verify pages
 * - @param loading - Optional flag to show loading spinner instead of content
 */
type PagesContainerProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  loading?: boolean;
};

export default function PagesContainer({
  children,
  header,
  loading,
}: PagesContainerProps) {
  const location = useLocation();
  const path = location.pathname;

  const isConnectPage = path === "/";
  const isVerifyPage = path === "/verify";

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loadingWrapper}>
            <motion.div
              className={styles.loader}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            {(isConnectPage || isVerifyPage) && (
              <>
                {header && <div className="mobileOnly">{header}</div>}

                <div className={styles.features}>
                  {[
                    "Access to 100+ GAMES for FREE thanks to ads",
                    "Log In Across All Your Devices",
                    "Skip the Line with Customer Support",
                  ].map((text, i) => (
                    <div key={i} className={styles.featureItem}>
                      <img
                        src={checkIcon}
                        alt="✔"
                        className={styles.checkIcon}
                      />
                      <span>{text}</span>
                    </div>
                  ))}

                  {isConnectPage && (
                    <p className={styles.disclaimer}>
                      By continuing, you agree to our{" "}
                      <a href="#">Terms of Service</a> and{" "}
                      <a href="#">Privacy Policy</a>.
                    </p>
                  )}
                </div>
              </>
            )}

            {children}
          </>
        )}
      </div>
    </main>
  );
}
