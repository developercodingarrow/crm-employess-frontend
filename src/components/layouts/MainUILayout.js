"use client";
import React from "react";
import styles from "./css/mainuilayout.module.css";
import MainNavbar from "../navbar/mainnavbar/MainNavbar";
import Asidebar from "./asidebar/Asidebar";
import MobileFooter from "../footer/MobileFooter";
export default function MainUILayout({ children, loginUser }) {
  return (
    <div className={styles.main_container}>
      <section className={styles.mainnavbar_wrapper}>
        <MainNavbar userRole={loginUser?.role} />
      </section>
      <section className={styles.inner_section}>
        <div className={styles.asidebar_wrapper}>
          <Asidebar userRole={loginUser?.role} />
        </div>
        <div className={styles.children_wrapper}>{children}</div>
      </section>
      <section className={styles.footer_wrapper}>
        <MobileFooter userRole={loginUser?.role} />
      </section>
    </div>
  );
}
