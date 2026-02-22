import React from "react";
import styles from "./projectcards.module.css";
import Link from "next/link";
import { GoLocation, GoCalendar } from "react-icons/go";

export default function ProjectCard({ project }) {
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Property type color
  const getTypeColor = (type) => {
    return type === "luxury" ? "#8b5cf6" : "#10b981";
  };

  return (
    <div className={styles.project_card}>
      {/* Top Bar - Property Type and Created Date */}
      <div className={styles.card_topbar}>
        <span
          className={styles.property_type}
          style={{
            backgroundColor: `${getTypeColor(project.propertyType)}20`,
            color: getTypeColor(project.propertyType),
          }}
        >
          {project.propertyType}
        </span>
        <div className={styles.created_date}>
          <GoCalendar className={styles.icon} />
          <span>{formatDate(project.createdAt)}</span>
        </div>
      </div>

      {/* Main Content - Flex for desktop */}
      <div className={styles.card_main}>
        {/* Left Side - Project Info */}
        <div className={styles.project_info}>
          <h3 className={styles.property_name}>{project.propertyName}</h3>
          <div className={styles.builder_name}>by {project.builder}</div>
        </div>

        {/* Right Side - Price (on desktop) */}
        <div className={styles.price_wrapper}>
          <div className={styles.price_range}>
            <span className={styles.price_label}>Price Range</span>
            <span className={styles.price_value}>
              {formatPrice(project.minPrice)} - {formatPrice(project.maxPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer - Location and View Button */}
      <div className={styles.card_footer}>
        <div className={styles.location}>
          <GoLocation className={styles.icon} />
          <span>{project.city}</span>
        </div>
        <Link
          href={`/project-leads/${project._id}`}
          className={styles.view_btn}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
