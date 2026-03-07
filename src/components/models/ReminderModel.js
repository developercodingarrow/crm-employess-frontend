"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../_contextApi/AppContextProvider";
import styles from "./modelStyle.module.css";
import { IoMdClose } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import {
  allReminders,
  clearAllNotifiedAction,
  deleteReminderAction,
} from "../../app/utils/reminderActions";
import { ReminderContext } from "../../_contextApi/ReminderContextProvider";
import Reminders from "../elements/reminders/Reminders";

export default function ReminderModel() {
  const {
    isOpenReminder,
    setisOpenReminder,
    handelCloseReminders,
    handelOpenReminders,
  } = useContext(ReminderContext);

  const [reminders, setreminders] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // For animation

  const handelget = async () => {
    try {
      const res = await allReminders();
      if (res.data.status === "success") {
        setreminders(res.data.data.reminders);
      }
    } catch (error) {
      console.log("error-", error);
    }
  };

  const handleDeleteReminder = async (reminderId) => {
    // Set deleting ID for animation
    setDeletingId(reminderId);

    try {
      const res = await deleteReminderAction({ id: reminderId });

      if (res.data.status === "success") {
        // Remove from UI after animation
        setTimeout(() => {
          setreminders((prev) => prev.filter((r) => r._id !== reminderId));
          setDeletingId(null);
        }, 300); // Match animation duration
      } else {
        setDeletingId(null);
      }
    } catch (error) {
      console.log("error---", error);
    }
  };

  const handelclearAllRemider = async () => {
    try {
      const res = await clearAllNotifiedAction();

      if (res.data.status === "success") {
        // Remove all notified reminders
        setreminders((prev) => prev.filter((r) => r.isNotified !== true));
      } else {
        setDeletingId(null);
      }
    } catch (error) {
      console.log("error---", error);
    }
  };

  // Handle open/close animations
  useEffect(() => {
    if (isOpenReminder) {
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
  }, [isOpenReminder]);

  const handleClose = () => {
    handelCloseReminders(); // This will set isRecentActiviriesOpen to false
  };

  // Don't render anything if shouldn't render
  if (!shouldRender) return null;
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
          {reminders.length >= 1 && (
            <Reminders
              reminders={reminders}
              onDeleteReminder={handleDeleteReminder}
              onclearAllReminder={handelclearAllRemider}
              deletingId={deletingId}
            />
          )}
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
