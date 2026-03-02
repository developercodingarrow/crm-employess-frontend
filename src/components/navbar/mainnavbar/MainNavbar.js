"use client";
import React from "react";
import styles from "../css/mainnavbar.module.css";
import Image from "next/image";
import logoImg from "../../../../public/layer-thick-icon.png";
import { GoBell } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MainNavbar(props) {
  const { userRole } = props;
  console.log(userRole);
  const pathname = usePathname();
  const navigationItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 1, name: "Projects", href: "/projects" },
  ];
  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.left_column}>
          <div className={styles.navbar_logo}>
            <div className={styles.nav_logo}>
              <Image
                src={logoImg}
                alt="nav-logo"
                width={24}
                height={24}
                className={styles.navlogo_img}
              />
            </div>
            <div className={styles.logo_text}>Office</div>
            <div className={styles.logo_sub}>CRM</div>
          </div>
        </div>
        <div className={styles.center_column}>
          <div className={styles.navigation}>
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${styles.nav_item} ${
                  pathname === item.href ? styles.active : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right_column}>
          <div className={styles.user_role}>{userRole}</div>
          <div className={styles.notification}>
            <GoBell />
            <span className={styles.notification_badge}>3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
