"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./homedashbord.module.css";
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
} from "react-icons/go";
import { MdOutlineLeaderboard, MdOutlineTrendingUp } from "react-icons/md";
// Add this to your HomeDashbord component
import { IoMdAlert, IoMdCall, IoMdMail, IoMdPeople } from "react-icons/io";
import { MdAccessTime, MdNotificationsActive } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";

import { ReminderContext } from "../../_contextApi/ReminderContextProvider";
import ReminderForm from "../elements/reminder_form/ReminderForm";
import Reminders from "../elements/reminders/Reminders";
import {
  clearAllNotifiedAction,
  deleteReminderAction,
} from "../../app/utils/reminderActions";
import StatsBarItem from "../elements/stats_bar_item/StatsBarItem";
import RecentLeadActivity from "../elements/recent_lead_activity/RecentLeadActivity";
import MobileFooter from "../footer/MobileFooter";

export default function HomeDashbord(props) {
  const { loginUser, remindersData, statsData } = props;
  console.log("statsData--", statsData);

  const { checkReminders } = useContext(ReminderContext);
  const [reminders, setreminders] = useState(remindersData?.reminders || []);
  const [deletingId, setDeletingId] = useState(null); // For animation

  useEffect(() => {
    // Initial check
    checkReminders(reminders);

    // Set up interval to check every 5 seconds
    const interval = setInterval(() => {
      checkReminders(reminders);
      console.log("Checking reminders at:", new Date().toLocaleTimeString());
    }, 5000);

    return () => clearInterval(interval);
  }, [reminders, checkReminders]);

  const handleDeleteReminder = async (reminderId) => {
    console.log("Delete reminder:", reminderId);
    // Set deleting ID for animation
    setDeletingId(reminderId);

    try {
      const res = await deleteReminderAction({ id: reminderId });
      console.log("delete-", res);

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
      console.log("clear all--", res);
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

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h1>Welcome back, {loginUser.name}! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#e6f0ff", color: "#3b82f6" }}
          >
            <GoProject />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>
              {statsData?.summary?.totalProjects}{" "}
            </span>
            <span className={styles.statLabel}>Total Projects</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowUp /> +12%
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#e0f7e9", color: "#10b981" }}
          >
            <GoPeople />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>
              {statsData?.summary?.totalLeads}{" "}
            </span>
            <span className={styles.statLabel}>Total Leads</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowUp /> +8%
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#fff3e0", color: "#f59e0b" }}
          >
            <GoCheckCircle />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>42</span>
            <span className={styles.statLabel}>Converted</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowDown /> -3%
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#fee9e9", color: "#ef4444" }}
          >
            <GoClock />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>18</span>
            <span className={styles.statLabel}>Follow-ups</span>
          </div>
          <div className={styles.statTrend}>
            <GoArrowUp /> +5%
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.statsRow}>
        {/* Lead Status Distribution */}
        <div className={styles.left_column}>
          <div className={styles.chartCard}>
            <h3>Lead Status</h3>
            <div className={styles.statusList}>
              <StatsBarItem
                label="New"
                value={statsData?.leads?.byStatus?.New || 0}
                total={statsData?.leads?.total || 1}
                color="#3b82f6"
              />
              <StatsBarItem
                label="Follow-up"
                value={statsData?.leads?.byStatus?.["Follow-up"] || 0}
                total={statsData?.leads?.total || 1}
                color="#f59e0b"
              />
              <StatsBarItem
                label="Interested"
                value={statsData?.leads?.byStatus?.Interested || 0}
                total={statsData?.leads?.total || 1}
                color="#10b981"
              />
              <StatsBarItem
                label="Converted"
                value={statsData?.leads?.byStatus?.Converted || 0}
                total={statsData?.leads?.total || 1}
                color="#8b5cf6"
              />
            </div>
          </div>
          {/* Recent Activity */}
          <div className={styles.activityCard}>
            <h3>Recent Activity</h3>
            <div className={styles.activityList}>
              {statsData?.recentActivities.map((item, index) => {
                return <RecentLeadActivity key={item.id} item={item} />;
              })}
            </div>
            <a href="#" className={styles.viewAllLink}>
              View all activity →
            </a>
          </div>
        </div>

        <div className={styles.right_column}>
          <Reminders
            reminders={reminders}
            onDeleteReminder={handleDeleteReminder}
            onclearAllReminder={handelclearAllRemider}
            deletingId={deletingId}
          />
        </div>
      </div>

      <section className={styles.footer_wrapper}>
        <MobileFooter />
      </section>
    </div>
  );
}
