import React from "react";
import styles from "./pageheader.module.css";
import { GoPlus, GoFilter } from "react-icons/go";
import HeaderTopBar from "../header_top_bar/HeaderTopBar";
import StatTab from "../stat_tab/StatTab";
export default function PageHeader(props) {
  const { pageTitle, pageSubtitle, btnText } = props;
  return (
    <div className={styles.page_header}>
      <HeaderTopBar
        pageTitle="Projects"
        pageSubtitle=" Manage system Projects and Details"
        btnText="Create New Project"
      />
      <div className={styles.stats_bar}>
        <div className={styles.stats_container}>
          <StatTab statNumber="24" statLabel="Total Projects" />
          <StatTab statNumber="30" statLabel="Luxury" />
          <StatTab statNumber="50" statLabel="Affordable" />
        </div>
      </div>
    </div>
  );
}
