"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../_contextApi/AppContextProvider";
import styles from "./modelStyle.module.css";
import { IoMdClose } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { myRecentActivitiesCtion } from "../../app/utils/statsActions";
import RecentLeadActivity from "../elements/recent_lead_activity/RecentLeadActivity";

export default function RecentActivitiesModel() {
  const { isRecentActiviriesOpen, handelCloserecentActivity } =
    useContext(AppContext);
  const [recentactivities, setrecentactivities] = useState([]);

  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handelget = async () => {
    try {
      const res = await myRecentActivitiesCtion();

      if (res.data.status === "success") {
        setrecentactivities(res.data.data.activities);
      }
    } catch (error) {
      console.log("error-", error);
    }
  };

  // Handle open/close animations
  useEffect(() => {
    if (isRecentActiviriesOpen) {
      setShouldRender(true);
      setIsClosing(false);
      handelget();
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
          {/* Recent Activity */}
          <div className={styles.activityCard}>
            <h3>Recent Activity</h3>
            <div className={styles.activityList}>
              {recentactivities?.map((item, index) => {
                return <RecentLeadActivity key={item.id} item={item} />;
              })}
            </div>
          </div>
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
