"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./mobilefooter.module.css";
import {
  GoHome,
  GoProject,
  GoPerson,
  GoClock,
  GoGraph,
  GoBell,
} from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext } from "../../_contextApi/AppContextProvider";
import { ReminderContext } from "../../_contextApi/ReminderContextProvider";

export default function MobileFooter() {
  const pathname = usePathname();
  const { handelOpenrecentActivity } = useContext(AppContext);
  const { handelOpenReminders } = useContext(ReminderContext);

  const menuItems = [
    { id: 1, name: "Home", href: "/", icon: <GoHome /> },
    { id: 2, name: "Projects", href: "/projects", icon: <GoProject /> },
  ];

  return (
    <div className={styles.mobile_footer}>
      <div className={styles.footer_container}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.footer_item} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.name}</span>
          </Link>
        ))}
        <div className={`${styles.footer_item}`} onClick={handelOpenReminders}>
          <span className={styles.icon}>
            {" "}
            <GoClock />{" "}
          </span>
          <span className={styles.label}>Reminders</span>
        </div>
        <div
          className={`${styles.footer_item}`}
          onClick={handelOpenrecentActivity}
        >
          <span className={styles.icon}>
            <GoGraph />
          </span>
          <span className={styles.label}>Activity</span>
        </div>
      </div>
    </div>
  );
}
