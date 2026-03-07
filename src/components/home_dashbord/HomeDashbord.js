"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./homedashbord.module.css";
import { ReminderContext } from "../../_contextApi/ReminderContextProvider";
import Reminders from "../elements/reminders/Reminders";
import {
  clearAllNotifiedAction,
  deleteReminderAction,
} from "../../app/utils/reminderActions";
import StatsBarItem from "../elements/stats_bar_item/StatsBarItem";
import RecentLeadActivity from "../elements/recent_lead_activity/RecentLeadActivity";

import StatsCard from "../elements/Stats_card/StatsCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeDashbord(props) {
  const { loginUser, remindersData, statsData } = props;

  const { checkReminders } = useContext(ReminderContext);
  const [reminders, setreminders] = useState(remindersData?.reminders || []);
  const [deletingId, setDeletingId] = useState(null); // For animation

  useEffect(() => {
    // Initial check
    checkReminders(reminders);

    // Set up interval to check every 5 seconds
    const interval = setInterval(() => {
      checkReminders(reminders);
    }, 5000);

    return () => clearInterval(interval);
  }, [reminders, checkReminders]);

  const handleDeleteReminder = async (reminderId) => {
    // Set deleting ID for animation
    try {
      const res = await deleteReminderAction({ id: reminderId });
      console.log("res-", res);
      if (res.error) {
        toast.error(res.error || "Failed to delete reminder", {
          position: "top-right",
          autoClose: 5000,
        });

        return;
      }
      if (res.data.status === "success") {
        // Remove from UI after animation
        setDeletingId(reminderId);
        setTimeout(() => {
          setreminders((prev) => prev.filter((r) => r._id !== reminderId));
          setDeletingId(null);
        }, 300); // Match animation duration
      } else {
        // Error toast from API
        toast.error(res.error || "Failed to delete reminder", {
          position: "top-right",
          autoClose: 5000,
        });
        setDeletingId(null);
      }
    } catch (error) {
      // Unexpected error toast
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });

      setDeletingId(null);
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

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.welcomeSection}>
        <h1>Welcome back, {loginUser.name}! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <StatsCard
          statValue={statsData?.summary?.totalProjects}
          statLabel="Total Projects"
          icon="project"
          bgColor="#e6f0ff"
          iconColor="#3b82f6"
        />

        <StatsCard
          statValue={statsData?.summary?.totalLeads}
          statLabel="Total Leads"
          icon="people"
          bgColor="#e0f7e9"
          iconColor="#10b981"
        />

        <StatsCard
          statValue={statsData?.summary?.conversionRate}
          statLabel="Conversion Rate"
          icon="checkcircle"
          bgColor="#f3e8ff"
          iconColor="#8b5cf6"
        />

        <StatsCard
          statValue={statsData?.summary?.interestedRate}
          statLabel="Interested Rate"
          icon="star"
          bgColor="#fff3e0"
          iconColor="#f59e0b"
        />
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
    </div>
  );
}
