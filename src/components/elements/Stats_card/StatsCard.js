import React from "react";
import styles from "./satscard.module.css";
import {
  GoProject,
  GoPeople,
  GoCheckCircle,
  GoStar,
  GoGraph,
  GoClock,
  GoBell,
} from "react-icons/go";

// Icon mapping
const iconMap = {
  project: <GoProject />,
  people: <GoPeople />,
  checkcircle: <GoCheckCircle />,
  star: <GoStar />,
  graph: <GoGraph />,
  clock: <GoClock />,
  bell: <GoBell />,
};

export default function StatsCard({
  statValue,
  statLabel,
  icon = "project",
  bgColor = "#e6f0ff",
  iconColor = "#3b82f6",
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.inner_container}>
        <div
          className={styles.statIcon}
          style={{ background: bgColor, color: iconColor }}
        >
          {iconMap[icon] || <GoProject />}
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statValue}>{statValue}</span>
          <span className={styles.statLabel}>{statLabel}</span>
        </div>
      </div>
      <div className={styles.mobile_statLabel}>{statLabel}</div>
    </div>
  );
}
