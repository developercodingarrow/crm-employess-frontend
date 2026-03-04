"use client";
import React from "react";
import styles from "./projectleadlayout.module.css";
import { GoPlus, GoFilter } from "react-icons/go";
import LeadMessenger from "./lead messenger/LeadMessenger";
import MobileFooter from "../footer/MobileFooter";
import ReminderForm from "../elements/reminder_form/ReminderForm";
import DetailPageHeader from "../elements/detailpage_topbar/DetailPageHeader";
import StatTab from "../elements/stat_tab/StatTab";
export default function ProjectLeadLayout(props) {
  const { project, projectLeads, satats } = props;

  return (
    <div className={styles.main_container}>
      <ReminderForm />
      <section className={styles.pageHeader_section}>
        <DetailPageHeader projectDetails={project} />
        {/* Stats Bar */}
        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <StatTab statLabel="Total Leads" statNumber={satats?.totalLeads} />
            <StatTab
              statLabel="Interested"
              statNumber={satats?.byStatus.Interested}
            />
            {satats?.byStatus.New && (
              <StatTab statLabel="New" statNumber={satats?.byStatus.New} />
            )}
          </div>
        </div>
      </section>

      <section>
        <LeadMessenger projectLeads={projectLeads} />
      </section>

      <section className={styles.footer_wrapper}>
        <MobileFooter />
      </section>
    </div>
  );
}
