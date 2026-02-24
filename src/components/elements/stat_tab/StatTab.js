import React from "react";
import styles from "./stattab.module.css";
export default function StatTab(props) {
  const { statLabel, statNumber } = props;
  return (
    <div className={styles.stat_box}>
      <span className={styles.stat_number}>{statNumber}</span>
      <span className={styles.stat_label}>{statLabel}</span>
    </div>
  );
}
