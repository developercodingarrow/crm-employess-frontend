"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./usercard.module.css";
import { GoPerson, GoMail, GoShield, GoCircleSlash } from "react-icons/go";
import { MdMessage, MdGroup, MdArrowForward } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";

export default function UserCard({ user, onToggleActive }) {
  const [isActive, setIsActive] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "admin":
        return "#3b82f6";
      case "employee":
        return "#10b981";
      default:
        return "#64748b";
    }
  };

  // Get status background
  const getStatusBg = (status) => {
    switch (status) {
      case "admin":
        return "#e8f0fe";
      case "employee":
        return "#e0f7e9";
      default:
        return "#f1f5f9";
    }
  };

  return (
    <div className={styles.card}>
      {/* Left Section - Lead Info */}
      <div className={styles.leftSection}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.userCount}>
            <GoPerson />
          </span>
        </div>

        <div className={styles.contactInfo}>
          <span className={styles.email}>
            <GoMail /> {formatDate(user.createdAt)}
          </span>
          <span className={styles.email}>
            <GoMail /> {user.email}
          </span>
        </div>

        <div className={styles.badgesRow}>
          <span
            className={styles.statusBadge}
            style={{
              background: getStatusBg(user.isActive),
              color: getStatusColor(user.isActive),
            }}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
          <span
            className={styles.statusBadge}
            style={{
              background: getStatusBg(user.role),
              color: getStatusColor(user.role),
            }}
          >
            {user.role}
          </span>
        </div>
      </div>

      {/* Right Section - Action Links */}
      <div className={styles.rightSection}></div>
    </div>
  );
}
