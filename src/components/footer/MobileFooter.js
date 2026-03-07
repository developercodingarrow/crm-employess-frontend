"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./mobilefooter.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoHome,
  GoProject,
  GoPerson,
  GoClock,
  GoGraph,
  GoBell,
  GoPeople, // Add this for Users
  GoBriefcase, // Add this for alternative
} from "react-icons/go";
import { MdDashboard, MdPeople, MdLeaderboard } from "react-icons/md"; // Alternative icons
import { IoPower } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext } from "../../_contextApi/AppContextProvider";
import { ReminderContext } from "../../_contextApi/ReminderContextProvider";

import { API_BASE_URL } from "../../../config";
import { useRouter } from "next/navigation";

export default function MobileFooter({ userRole }) {
  console.log(userRole);
  const router = useRouter();
  const pathname = usePathname();
  const { handelOpenrecentActivity } = useContext(AppContext);
  const { handelOpenReminders } = useContext(ReminderContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { id: 1, name: "Home", href: "/", icon: <GoHome /> },
    { id: 2, name: "Projects", href: "/projects", icon: <GoProject /> },
  ];

  const adminmenuItemsAlt = [
    {
      id: 1,
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <MdDashboard />,
    },
    { id: 2, name: "Projects", href: "/projects", icon: <GoBriefcase /> },
    { id: 3, name: "Leads", href: "/admin/leads", icon: <MdLeaderboard /> },
    { id: 4, name: "Users", href: "/admin/users", icon: <MdPeople /> },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // ✅ Client-side cookie deletion
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Optional: Call backend logout API (fire and forget)
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.log("Backend logout error:", err);
      }
      toast.success("Logged out successfully");
      // Redirect to login
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to logout");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.mobile_footer}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 99999,
          fontSize: "14px",
        }}
      />

      {userRole === "employee" && (
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

          <div
            className={`${styles.footer_item}`}
            onClick={handelOpenReminders}
          >
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

          <div
            className={`${styles.footer_item} ${isLoggingOut ? styles.disabled : ""}`}
            onClick={handleLogout}
          >
            <span className={styles.icon}>
              <IoPower />
            </span>
            <span className={styles.label}>Log Out</span>
          </div>
        </div>
      )}

      {userRole === "admin" && (
        <div className={styles.footer_container}>
          {adminmenuItemsAlt.map((item) => (
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

          <div
            className={`${styles.footer_item} ${isLoggingOut ? styles.disabled : ""}`}
            onClick={handleLogout}
          >
            <span className={styles.icon}>
              <IoPower />
            </span>
            <span className={styles.label}>Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
}
