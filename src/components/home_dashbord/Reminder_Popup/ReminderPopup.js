"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./reminderpopup.module.css";

import {
  IoMdAlert,
  IoMdCall,
  IoMdMail,
  IoMdPeople,
  IoMdClose,
  IoMdClock,
  IoMdVolumeOff,
} from "react-icons/io";
import { MdSnooze, MdNotificationsActive } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { FaPhone, FaEnvelope, FaCalendarCheck } from "react-icons/fa";
import { playNotificationSound, stopSound } from "../../../app/utils/playSound";
import { ReminderContext } from "../../../_contextApi/ReminderContextProvider";
import { RemindernotifiedAction } from "../../../app/utils/reminderActions";

export default function ReminderPopup() {
  const {
    showReminderPopup,
    currentReminder,
    dismissReminder,
    snoozeReminder,
    setShowReminderPopup,
  } = useContext(ReminderContext);

  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handeldismissReminder = async (leadId) => {
    try {
      const res = await RemindernotifiedAction({ id: leadId });

      if (res.data.status === "success") {
        dismissReminder(leadId);
      }
    } catch (error) {
      console.log("error--", error);
    }
  };

  // Play sound when popup opens
  useEffect(() => {
    if (showReminderPopup && currentReminder && !isMuted) {
      // Stop previous sound if any
      if (audioRef.current) {
        stopSound(audioRef.current);
      }
      // Play new sound
      audioRef.current = playNotificationSound();
    }

    // Cleanup when component unmounts or popup closes
    return () => {
      if (audioRef.current) {
        stopSound(audioRef.current);
      }
    };
  }, [showReminderPopup, currentReminder, isMuted]);

  // Auto dismiss after 30 seconds
  useEffect(() => {
    if (showReminderPopup && currentReminder) {
      const timer = setTimeout(() => {
        dismissReminder(currentReminder._id);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showReminderPopup, currentReminder]);

  if (!showReminderPopup || !currentReminder) return null;

  const reminder = currentReminder;

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get time remaining
  const getTimeRemaining = (timestamp) => {
    const now = new Date();
    const reminderTime = new Date(timestamp);
    const diffMinutes = Math.floor((reminderTime - now) / (1000 * 60));

    if (diffMinutes < 0) return "Overdue";
    if (diffMinutes === 0) return "Now";
    if (diffMinutes < 60) return `${diffMinutes} min left`;
    return formatTime(timestamp);
  };

  // Get icon based on type
  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "call":
        return <FaPhone />;
      case "email":
        return <FaEnvelope />;
      case "meeting":
        return <IoMdPeople />;
      case "visit":
        return <FaCalendarCheck />;
      default:
        return <IoMdAlert />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#3b82f6";
    }
  };

  // Get priority background
  const getPriorityBg = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#fee9e9";
      case "medium":
        return "#fff3e0";
      case "low":
        return "#e0f7e9";
      default:
        return "#e6f0ff";
    }
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.popup}
        style={{
          borderLeft: `4px solid ${getPriorityColor(reminder.priority)}`,
        }}
      >
        {/* Animated Bell Icon */}
        <div className={styles.bellContainer}>
          <BsFillBellFill className={styles.animatedBell} />
          <span className={styles.pulseRing}></span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h3>
            <MdNotificationsActive className={styles.headerIcon} />
            Reminder Alert
          </h3>
          <button
            className={styles.closeBtn}
            onClick={() => handeldismissReminder(reminder._id)}
          >
            <IoMdClose />
          </button>
        </div>

        {/* Time Badge */}
        <div className={styles.timeBadge}>
          <IoMdClock className={styles.timeIcon} />
          <span className={styles.timeText}>
            {getTimeRemaining(reminder.reminderTime)}
          </span>
        </div>

        {/* Lead Info */}
        <div className={styles.leadInfo}>
          <div className={styles.leadAvatar}>
            {reminder.lead?.name?.charAt(0) || "L"}
          </div>
          <div className={styles.leadDetails}>
            <h4 className={styles.leadName}>
              {reminder.lead?.name || "Unknown Lead"}
            </h4>
            <p className={styles.leadPhone}>
              {reminder.lead?.phone || "No phone"}
            </p>
          </div>
        </div>

        {/* Reminder Message */}
        <div className={styles.messageBox}>
          <div
            className={styles.typeIcon}
            style={{ color: getPriorityColor(reminder.priority) }}
          >
            {getTypeIcon(reminder.type)}
          </div>
          <p className={styles.message}>{reminder.message || "No message"}</p>
        </div>

        {/* Priority Badge */}
        <div
          className={styles.priorityBadge}
          style={{
            background: getPriorityBg(reminder.priority),
            color: getPriorityColor(reminder.priority),
          }}
        >
          {reminder.priority?.toUpperCase() || "NORMAL"} PRIORITY
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            className={styles.viewBtn}
            onClick={() => {
              // Navigate to lead details
              window.location.href = `/lead/${reminder.lead?._id}`;
              dismissReminder(reminder._id);
            }}
          >
            View Lead
          </button>
          <button
            className={styles.snoozeBtn}
            onClick={() => snoozeReminder(reminder._id, 5)}
          >
            <MdSnooze className={styles.btnIcon} />
            Snooze 5min
          </button>
          <button
            className={styles.dismissBtn}
            onClick={() => handeldismissReminder(reminder._id)}
          >
            <IoMdVolumeOff className={styles.btnIcon} />
            Dismiss
          </button>
        </div>

        {/* Snooze Options */}
        <div className={styles.snoozeOptions}>
          <button onClick={() => snoozeReminder(reminder._id, 10)}>
            10 min
          </button>
          <button onClick={() => snoozeReminder(reminder._id, 30)}>
            30 min
          </button>
          <button onClick={() => snoozeReminder(reminder._id, 60)}>
            1 hour
          </button>
          <button onClick={() => snoozeReminder(reminder._id, 1440)}>
            Tomorrow
          </button>
        </div>
      </div>
    </div>
  );
}
