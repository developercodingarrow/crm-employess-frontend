import React from "react";
import styles from "./projectleadlayout.module.css";
import { GoPlus, GoFilter } from "react-icons/go";
import LeadMessenger from "./lead messenger/LeadMessenger";
export default function ProjectLeadLayout(props) {
  const { projectLeads, satats } = props;
  return (
    <div className={styles.main_container}>
      <section className={styles.pageHeader_section}>
        <div className={styles.page_topBar}>
          <div className={styles.page_title}>Royal Gardens</div>
        </div>
        {/* Stats Bar */}
        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <div className={styles.stat_box}>
              <span className={styles.stat_number}>{satats?.totalLeads}</span>
              <span className={styles.stat_label}>Total Leads</span>
            </div>
            <div className={styles.stat_box}>
              <span className={styles.stat_label}>Maharashtra</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <LeadMessenger projectLeads={projectLeads} />
      </section>
    </div>
  );
}
