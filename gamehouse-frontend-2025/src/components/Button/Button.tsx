import { motion, type HTMLMotionProps } from "motion/react";
import styles from "./Button.module.css";

type MotionButtonProps = HTMLMotionProps<"button">;

const Button = ({ children, ...props }: MotionButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    className={styles.button}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;
