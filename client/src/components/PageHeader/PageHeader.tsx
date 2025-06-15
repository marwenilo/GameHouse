import { memo } from "react";
import styles from "./PageHeader.module.css";

/**
 * Props for PageHeader:
 * - @param title - Main header title (required)
 * - @param subtitle - Optional subtitle below the title
 * - @param highlight - Optional highlight element, usually styled span
 * - @param className - Extra class names to customize styling
 */
function PageHeader({
  title,
  subtitle,
  highlight,
  className = "",
}: {
  title: string;
  subtitle?: React.ReactNode;
  highlight?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.header} ${className}`}>
      {/* Main title */}
      <h1 className={styles.title}>{title}</h1>
      {/* Render subtitle if provided */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {/* Render highlight if provided */}
      {highlight && <span className={styles.highlight}>{highlight}</span>}
    </div>
  );
}
export default memo(PageHeader);
