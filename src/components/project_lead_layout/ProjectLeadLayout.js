"use client";
import React from "react";
import styles from "./projectleadlayout.module.css";
import { GoPlus, GoFilter } from "react-icons/go";
import LeadMessenger from "./lead messenger/LeadMessenger";
import ReminderForm from "../elements/reminder_form/ReminderForm";
import DetailPageHeader from "../elements/detailpage_topbar/DetailPageHeader";
import StatTab from "../elements/stat_tab/StatTab";
export default function ProjectLeadLayout(props) {
  const { project, projectLeads, stats } = props;

  return (
    <div className={styles.main_container}>
      <ReminderForm />
      <section className={styles.pageHeader_section}>
        <DetailPageHeader projectDetails={project} />
        {/* Stats Bar */}
        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <StatTab
              statLabel="Total Leads"
              statNumber={stats?.totalLeads || 0}
            />
            {stats?.byStatus.Interested && (
              <StatTab
                statLabel="Interested"
                statNumber={stats?.byStatus.Interested}
              />
            )}

            {stats?.byStatus.Converted && (
              <StatTab
                statLabel="Converted"
                statNumber={stats?.byStatus.Converted}
              />
            )}
            {stats?.byStatus.New && (
              <StatTab statLabel="New" statNumber={stats?.byStatus.New} />
            )}
          </div>
        </div>
      </section>

      <section>
        <LeadMessenger projectLeads={projectLeads} />
      </section>
    </div>
  );
}
