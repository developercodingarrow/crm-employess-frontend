"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../_contextApi/AppContextProvider";
import styles from "./modelStyle.module.css";
import { IoMdClose } from "react-icons/io";
import { GoGraph } from "react-icons/go";

export default function RecentActivitiesModel() {
  const { isRecentActiviriesOpen, handelCloserecentActivity } =
    useContext(AppContext);

  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle open/close animations
  useEffect(() => {
    if (isRecentActiviriesOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300); // Match animation duration

      return () => clearTimeout(timer);
    }
  }, [isRecentActiviriesOpen]);

  // Don't render anything if shouldn't render
  if (!shouldRender) return null;

  const handleClose = () => {
    handelCloserecentActivity(); // This will set isRecentActiviriesOpen to false
  };

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.slideDown : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <GoGraph className={styles.headerIcon} />
            <h3>Recent Activity</h3>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>

        {/* Modal Body - We'll add RecentActivity component here later */}
        <div className={styles.body}>
          <p className={styles.placeholder}>
            Your recent activities will appear here
          </p>
          {/* <RecentActivity data={activities} /> */}
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <button className={styles.clearBtn}>Clear All</button>
          <button className={styles.viewAllBtn}>View All</button>
        </div>
      </div>
    </div>
  );
}
