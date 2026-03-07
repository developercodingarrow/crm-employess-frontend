import React from "react";
import styles from "./leadcard.module.css";
import { GoMail, GoDeviceMobile, GoTag } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { MdMessage, MdGroup, MdArrowForward } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";

export default function LeadCard({ lead }) {
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#3b82f6";
      case "Contacted":
        return "#8b5cf6";
      case "Follow-up":
        return "#f59e0b";
      case "Interested":
        return "#10b981";
      case "Not Interested":
        return "#ef4444";
      case "Converted":
        return "#8b5cf6";
      case "Lost":
        return "#64748b";
      default:
        return "#64748b";
    }
  };

  // Get status background
  const getStatusBg = (status) => {
    switch (status) {
      case "New":
        return "#e8f0fe";
      case "Contacted":
        return "#f3e8ff";
      case "Follow-up":
        return "#fff3e0";
      case "Interested":
        return "#e0f7e9";
      case "Not Interested":
        return "#fee9e9";
      case "Converted":
        return "#f3e8ff";
      case "Lost":
        return "#f1f5f9";
      default:
        return "#f1f5f9";
    }
  };

  return (
    <div className={styles.card}>
      {/* Left Section - Lead Info */}
      <div className={styles.leftSection}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{lead.name}</span>
          <span className={styles.userCount}>
            <GoPerson /> {lead.userCount}
          </span>
        </div>

        <div className={styles.contactInfo}>
          <span className={styles.phone}>
            <GoDeviceMobile /> {lead.phone}
          </span>
          <span className={styles.email}>
            <GoMail /> {lead.email}
          </span>
        </div>

        <div className={styles.badgesRow}>
          <span className={styles.sourceBadge}>
            <IoMdAttach className={styles.sourceIcon} />
            {lead.source}
          </span>
          <span
            className={styles.statusBadge}
            style={{
              background: getStatusBg(lead.status),
              color: getStatusColor(lead.status),
            }}
          >
            {lead.status}
          </span>
        </div>

        {/* Assigned Users */}
        {lead.assignedUsers && lead.assignedUsers.length > 0 && (
          <div className={styles.assignedUsers}>
            <MdGroup className={styles.groupIcon} />

            {/* Show first 3 users */}
            {lead.assignedUsers.slice(0, 3).map((user, index) => (
              <span key={user.id} className={styles.userTag}>
                {user.name} ({user.role})
                {index < Math.min(lead.assignedUsers.length, 3) - 1 && ", "}
              </span>
            ))}

            {/* If more than 3 users, show "see all" link */}
            {lead.assignedUsers.length > 3 && (
              <>
                <span className={styles.moreUsers}>...</span>
                <a href="/users" className={styles.seeAllLink}>
                  see all {lead.assignedUsers.length}
                </a>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section - Action Links */}
    </div>
  );
}
