"use client";
import React from "react";
import styles from "./adminprojectcard.module.css";
import { LuMapPin, LuBuilding, LuCalendar, LuDollarSign } from "react-icons/lu";
import { GoPeople, GoBriefcase, GoArrowRight } from "react-icons/go";
import { FaCrown, FaHome } from "react-icons/fa";
import Link from "next/link";
export default function AdminProjectCard({ item }) {
  // Format price in Crores
  const formatPrice = (price) => {
    const inCrores = price / 10000000;
    return `₹${inCrores} Cr`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get type icon and color
  const getTypeDetails = (type) => {
    switch (type?.toLowerCase()) {
      case "luxury":
        return { icon: <FaCrown />, color: "#8b5cf6", bg: "#f3e8ff" };
      case "affordable":
        return { icon: <FaHome />, color: "#10b981", bg: "#e0f7e9" };
      default:
        return { icon: <LuBuilding />, color: "#3b82f6", bg: "#e6f0ff" };
    }
  };

  const typeDetails = getTypeDetails(item?.propertyType);
  return (
    <div className={styles.card}>
      {/* Top Row - Type and Date */}
      <div className={styles.topRow}>
        <span
          className={styles.typeBadge}
          style={{ background: typeDetails.bg, color: typeDetails.color }}
        >
          <span className={styles.typeIcon}>{typeDetails.icon}</span>
          {item?.propertyType}
        </span>
        <span className={styles.date}>
          <LuCalendar className={styles.dateIcon} />
          {formatDate(item?.createdAt)}
        </span>
      </div>

      {/* Project Name */}
      <h3 className={styles.projectName}>{item?.propertyName}</h3>

      {/* Builder */}
      <div className={styles.builder}>
        <GoBriefcase className={styles.builderIcon} />
        <span>{item?.builder}</span>
      </div>

      {/* Location and Price Row */}
      <div className={styles.locationPriceRow}>
        <div className={styles.location}>
          <LuMapPin className={styles.locationIcon} />
          <span>
            {item?.city}, {item?.state}
          </span>
        </div>
        <div className={styles.price}>
          <span>
            {formatPrice(item?.minPrice)} - {formatPrice(item?.maxPrice)}
          </span>
        </div>
      </div>

      {/* Address */}
      <div className={styles.address}>
        <span>{item?.address}</span>
      </div>

      {/* Stats and Button Row */}
      <div className={styles.statsButtonRow}>
        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <GoPeople
              className={styles.statIcon}
              style={{ color: "#3b82f6" }}
            />
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{item?.userCount || 0}</span>
              <span className={styles.statLabel}>users</span>
            </div>
          </div>
          <span className={styles.statDivider}>•</span>
          <div className={styles.statItem}>
            <LuBuilding
              className={styles.statIcon}
              style={{ color: "#10b981" }}
            />
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{item?.leadCount || 0}</span>
              <span className={styles.statLabel}>leads</span>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <div className={styles.viewBtn}>Delete</div>
      </div>
    </div>
  );
}
