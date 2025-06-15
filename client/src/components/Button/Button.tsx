import { useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import styles from "./Button.module.css";

type Ripple = {
  x: number;
  y: number;
  size: number;
  id: number;
};

type MotionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: React.ReactNode;
};
const Button = ({ children, ...props }: MotionButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation duration (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={styles.button}
      {...props}
    >
      {children}
      {ripples.map(({ x, y, size, id }) => (
        <motion.span
          key={id}
          initial={{ opacity: 0.4, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            createRipple(e);
            if (props.onClick) props.onClick(e);
          }}
          style={{
            position: "absolute",
            top: y,
            left: x,
            width: size,
            height: size,
            borderRadius: "50%",
          }}
        ></motion.span>
      ))}
    </motion.button>
  );
};

export default Button;
