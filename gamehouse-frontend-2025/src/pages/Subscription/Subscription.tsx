import { useEffect } from "react";
import confetti from "canvas-confetti"; // Confetti animation library
import PagesContainer from "../../components/PagesContainer/PagesContainer";
import styles from "./Subscription.module.css";

export default function Subscription() {
  // useEffect runs once when component mounts
  useEffect(() => {
    // Trigger confetti animation with specific options
    confetti({
      particleCount: 150, // Number of confetti particles
      spread: 70, // How far confetti spreads horizontally
      origin: { y: 0.6 }, // Vertical origin position (0 is top, 1 is bottom)
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Wrap content inside PagesContainer for consistent page layout and styling
    <PagesContainer>
      <div className={styles.wrapperSubscription}>
        {/* Main congratulation message */}
        <h1>
          Congrats! You are a <span>subscriber</span>
        </h1>
        {/* Subheading encouraging user to explore */}
        <p>Explore your membership now</p>
      </div>
    </PagesContainer>
  );
}
