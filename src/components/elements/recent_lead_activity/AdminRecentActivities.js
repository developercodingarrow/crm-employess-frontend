import React from "react";
import styles from "./adminrecentactivities.module.css";
import {
  GoGraph,
  GoPeople,
  GoProject,
  GoCheckCircle,
  GoClock,
  GoCalendar,
  GoStar,
  GoEye,
  GoArrowUp,
  GoArrowDown,
  GoComment,
  GoBell,
  GoMail,
  GoDeviceMobile,
} from "react-icons/go";

export default function AdminRecentActivities(props) {
  const { item } = props;
  // Function to get icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case "remark":
        return <GoComment />;
      case "conversion":
        return <GoCheckCircle />;
      case "followup":
        return <GoClock />;
      case "interested":
        return <GoStar />;
      case "call":
        return <GoDeviceMobile />;
      case "email":
        return <GoMail />;
      case "reminder":
        return <GoBell />;
      default:
        return <GoPeople />;
    }
  };

  // Function to get icon color based on type
  const getIconColor = (type) => {
    switch (type) {
      case "remark":
        return "#3b82f6"; // Blue
      case "conversion":
        return "#10b981"; // Green
      case "followup":
        return "#f59e0b"; // Orange
      case "interested":
        return "#8b5cf6"; // Purple
      case "call":
        return "#ec4899"; // Pink
      case "email":
        return "#ef4444"; // Red
      case "reminder":
        return "#f59e0b"; // Orange
      default:
        return "#64748b"; // Gray
    }
  };

  // Function to get role badge color
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "#8b5cf6"; // Purple for admin
      case "employee":
        return "#3b82f6"; // Blue for employee
      default:
        return "#64748b"; // Gray
    }
  };

  // Dynamic styles for icon
  const iconStyle = {
    color: getIconColor(item.type),
    fontSize: "18px",
  };
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon} style={iconStyle}>
        {getActivityIcon(item.type)}
      </div>
      <div className={styles.activityContent}>
        {/* User Info Row */}
        <div className={styles.userInfoRow}>
          <span className={styles.userName}>{item.user?.name}</span>
          <span
            className={styles.userRole}
            style={{
              backgroundColor: `${getRoleColor(item.user?.role)}15`,
              color: getRoleColor(item.user?.role),
            }}
          >
            {item.user?.role}
          </span>
        </div>

        {/* Activity Message */}
        <p className={styles.activityText}>{item.message}</p>

        {/* Lead and Time Row */}
        <div className={styles.leadTimeRow}>
          <span className={styles.leadName}>
            <strong>{item.lead}</strong>
          </span>
          <span className={styles.activityTime}>{item.time}</span>
        </div>
      </div>
    </div>
  );
}
