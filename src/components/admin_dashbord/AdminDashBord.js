"use client";
import React from "react";
import styles from "./admindashbord.module.css";
import StatsCard from "../elements/Stats_card/StatsCard";
import StatsBarItem from "../elements/stats_bar_item/StatsBarItem";
import AdminRecentActivities from "../elements/recent_lead_activity/AdminRecentActivities";
export default function AdminDashBord(props) {
  const { overviewData, activitiesData } = props;

  console.log("activitiesData--", activitiesData);
  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h1>Welcome back, Admin! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        <StatsCard
          statValue={overviewData.summary.totalProjects}
          statLabel="Total Projects"
          icon="project"
          bgColor="#e6f0ff"
          iconColor="#3b82f6"
        />

        <StatsCard
          statValue={overviewData.summary.totalLeads}
          statLabel="Total Leads"
          icon="people"
          bgColor="#e0f7e9"
          iconColor="#10b981"
        />
        <StatsCard
          statValue={overviewData.summary.totalUsers}
          statLabel="Total users"
          icon="checkcircle"
          bgColor="#f3e8ff"
          iconColor="#8b5cf6"
        />
        <StatsCard
          statValue={overviewData.users.admin}
          statLabel="Admins"
          icon="star"
          bgColor="#fff3e0"
          iconColor="#f59e0b"
        />
      </div>
      {/* Charts Section */}
      <div className={styles.statsRow}>
        <div className={styles.left_column}>
          <div className={styles.chartCard}>
            <h3>Lead Status</h3>
            <div className={styles.statusList}>
              <StatsBarItem
                label="New"
                value={overviewData?.leads?.byStatus?.New || 0}
                total={overviewData?.leads?.total || 1}
                color="#3b82f6" // Blue
              />

              <StatsBarItem
                label="Contacted"
                value={overviewData?.leads?.byStatus?.Contacted || 0}
                total={overviewData?.leads?.total || 1}
                color="#8b5cf6" // Purple
              />

              <StatsBarItem
                label="Follow-up"
                value={overviewData?.leads?.byStatus?.["Follow-up"] || 0}
                total={overviewData?.leads?.total || 1}
                color="#f59e0b" // Orange
              />

              <StatsBarItem
                label="Interested"
                value={overviewData?.leads?.byStatus?.Interested || 0}
                total={overviewData?.leads?.total || 1}
                color="#10b981" // Green
              />

              <StatsBarItem
                label="Not Interested"
                value={overviewData?.leads?.byStatus?.["Not Interested"] || 0}
                total={overviewData?.leads?.total || 1}
                color="#ef4444" // Red
              />

              <StatsBarItem
                label="Converted"
                value={overviewData?.leads?.byStatus?.Converted || 0}
                total={overviewData?.leads?.total || 1}
                color="#8b5cf6" // Purple (same as Contacted)
              />

              <StatsBarItem
                label="Lost"
                value={overviewData?.leads?.byStatus?.Lost || 0}
                total={overviewData?.leads?.total || 1}
                color="#64748b" // Gray
              />
            </div>
          </div>
          {/* Lead Source Distribution */}
          <div className={styles.chartCard}>
            <h3>Lead Sources</h3>
            <div className={styles.sourceList}>
              <StatsBarItem
                label="Website"
                value={overviewData?.leads?.bySource?.Website || 0}
                total={overviewData?.leads?.total || 1}
                color="#3b82f6" // Blue
                type="percentage"
              />
              <StatsBarItem
                label="Contacted"
                value={overviewData?.leads?.bySource?.Referral || 0}
                total={overviewData?.leads?.total || 1}
                color="#8b5cf6" // Purple
                type="percentage"
              />

              <StatsBarItem
                label="Walk-in"
                value={overviewData?.leads?.bySource?.["Walk-in"] || 0}
                total={overviewData?.leads?.total || 1}
                color="#f59e0b" // Orange
                type="percentage"
              />

              <StatsBarItem
                label="Campaign"
                value={overviewData?.leads?.bySource?.Campaign || 0}
                total={overviewData?.leads?.total || 1}
                color="#10b981" // Green
                type="percentage"
              />

              <StatsBarItem
                label="Not Interested"
                value={overviewData?.leads?.byStatus?.["Not Interested"] || 0}
                total={overviewData?.leads?.total || 1}
                color="#ef4444" // Red/
                type="percentage"
              />

              <StatsBarItem
                label="Converted"
                value={overviewData?.leads?.byStatus?.Converted || 0}
                total={overviewData?.leads?.total || 1}
                color="#8b5cf6" // Purple (same as Contacted)
                type="percentage"
              />
            </div>
          </div>
          {/* Project Source Distribution */}
          <div className={styles.chartCard}>
            <h3>Projects</h3>
            <div className={styles.sourceList}>
              <StatsBarItem
                label="Affordable
"
                value={overviewData?.projects?.byType?.affordable || 0}
                total={overviewData?.projects?.total || 1}
                color="#3b82f6" // Blue
              />
              <StatsBarItem
                label="Luxury"
                value={overviewData?.projects?.byType?.luxury || 0}
                total={overviewData?.projects?.total || 1}
                color="#f59e0b" // Orange
              />
            </div>
          </div>
          <div className={styles.chartCard}>
            <h3>Users</h3>
            <div className={styles.sourceList}>
              <StatsBarItem
                label="Admin"
                value={overviewData?.users?.admin || 0}
                total={overviewData?.users?.total || 1}
                color="#10b981" // Green
              />
              <StatsBarItem
                label="Employee"
                value={overviewData?.users?.employee || 0}
                total={overviewData?.users?.total || 1}
                color="#8b5cf6" // Purple
              />
            </div>
          </div>
        </div>

        <div className={styles.right_column}>
          {/* Recent Activity */}
          <div className={styles.activityCard}>
            <h3>Recent Activity</h3>
            <div className={styles.activityList}>
              {activitiesData.activities.map((el, index) => {
                return <AdminRecentActivities key={index} item={el} />;
              })}
            </div>
            <a href="#" className={styles.viewAllLink}>
              View all activity →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
