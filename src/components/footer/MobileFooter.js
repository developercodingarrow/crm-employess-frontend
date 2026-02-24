"use client";
import React from "react";
import styles from "./mobilefooter.module.css";
import { GoHome, GoProject, GoPerson } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileFooter() {
  const pathname = usePathname();

  const menuItems = [
    { id: 1, name: "Home", href: "/", icon: <GoHome /> },
    { id: 2, name: "Projects", href: "/projects", icon: <GoProject /> },
    { id: 3, name: "Profile", href: "/profile", icon: <GoPerson /> },
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
      </div>
    </div>
  );
}
