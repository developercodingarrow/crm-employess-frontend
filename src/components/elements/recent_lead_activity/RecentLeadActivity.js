import React from "react";
import styles from "./recentleadactivity.module.css";
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

export default function RecentLeadActivity(props) {
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

  // Function to get message based on type and text
  const getActivityMessage = (type, text) => {
    switch (type) {
      case "remark":
        return (
          <>
            New remark added for <strong>{text}</strong>
          </>
        );
      case "conversion":
        return (
          <>
            Lead <strong>{text}</strong> converted
          </>
        );
      case "followup":
        return (
          <>
            Follow-up scheduled with <strong>{text}</strong>
          </>
        );
      case "interested":
        return (
          <>
            <strong>{text}</strong> marked as Interested
          </>
        );
      case "call":
        return (
          <>
            Call scheduled with <strong>{text}</strong>
          </>
        );
      case "email":
        return (
          <>
            Email sent to <strong>{text}</strong>
          </>
        );
      case "reminder":
        return (
          <>
            Reminder set for <strong>{text}</strong>
          </>
        );
      default:
        return <>{text}</>;
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
        <p>{getActivityMessage(item.type, item.text)}</p>
        <span className={styles.activityTime}>{item?.time}</span>
      </div>
    </div>
  );
}
