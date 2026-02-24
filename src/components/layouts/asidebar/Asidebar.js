"use client";
import React from "react";
import styles from "./asidebar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  GoHome,
  GoProject,
  GoPeople,
  GoGraph,
  GoGear,
  GoSignOut,
} from "react-icons/go";

export default function Asidebar() {
  const pathname = usePathname();

  const navigationItems = [
    { id: 1, name: "Dashboard", href: "/", icon: <GoHome /> },
    { id: 2, name: "Projects", href: "/projects", icon: <GoProject /> },
    { id: 3, name: "Leads", href: "/leads", icon: <GoPeople /> },
    { id: 4, name: "Reports", href: "/reports", icon: <GoGraph /> },
    { id: 5, name: "Users", href: "/users", icon: <GoPeople /> },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    // Clear tokens, redirect to login, etc.
  };

  return (
    <aside className={styles.asidebar}>
      <div className={styles.navigation}>
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.nav_item} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            <span className={styles.nav_icon}>{item.icon}</span>
            <span className={styles.nav_name}>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className={styles.logout_container}>
        <button onClick={handleLogout} className={styles.logout_btn}>
          <span className={styles.logout_icon}>
            <GoSignOut />
          </span>
          <span className={styles.logout_text}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
