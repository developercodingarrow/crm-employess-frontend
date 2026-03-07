import React from "react";
import styles from "./statsbaritem.module.css";

export default function StatsBarItem({
  label,
  value,
  total,
  color = "#3b82f6",
}) {
  // Calculate percentage
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className={styles.statusItem}>
      <span className={styles.statusLabel}>
        <span className={styles.dot} style={{ background: color }}></span>
        {label}
      </span>
      <span className={styles.statusValue}>{value}</span>
      <span className={styles.statusBar}>
        <div
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        ></div>
      </span>
    </div>
  );
}
