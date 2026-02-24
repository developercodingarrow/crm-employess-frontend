import React from "react";
import styles from "./usercard.module.css";
import { GoPerson, GoMail, GoShield, GoCircleSlash } from "react-icons/go";

export default function UserCard({ user, onToggleActive }) {
  const getRoleIcon = (role) => {
    switch (role) {
      case "superadmin":
        return "👑";
      case "admin":
        return "⚙️";
      default:
        return "👤";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "superadmin":
        return "#8b5cf6";
      case "admin":
        return "#3b82f6";
      default:
        return "#10b981";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={styles.user_card}>
      <div className={styles.user_card_header}>
        <div className={styles.user_avatar}>{user.name.charAt(0)}</div>
        <div className={styles.user_info}>
          <h4 className={styles.user_name}>{user.name}</h4>
          <div className={styles.user_email}>
            <GoMail className={styles.card_icon} />
            <span>{user.email}</span>
          </div>
        </div>
        <button
          className={`${styles.status_toggle} ${user.isActive ? styles.active : styles.inactive}`}
          onClick={() => onToggleActive(user.id)}
          title={user.isActive ? "Deactivate user" : "Activate user"}
        >
          {user.isActive ? "Active" : "Inactive"}
        </button>
      </div>

      <div className={styles.user_card_footer}>
        <div
          className={styles.user_role}
          style={{
            backgroundColor: `${getRoleColor(user.role)}20`,
            color: getRoleColor(user.role),
          }}
        >
          <span className={styles.role_icon_small}>
            {getRoleIcon(user.role)}
          </span>
          <span className={styles.role_text}>{user.role}</span>
        </div>
        <span className={styles.user_joined}>
          Joined {formatDate(user.createdAt)}
        </span>
      </div>
    </div>
  );
}
