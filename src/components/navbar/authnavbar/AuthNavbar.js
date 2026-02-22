"use client";
import React from "react";
import styles from "../css/mainnavbar.module.css";
import Image from "next/image";
import logoImg from "../../../../public/layer-thick-icon.png";

export default function AuthNavbar() {
  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.left_column}>
          <div className={styles.navbar_logo}>
            <div className={styles.nav_logo}>
              <Image
                alt="nav-logo"
                src={logoImg}
                width={24}
                height={24}
                className={styles.navlogo_img}
              />
            </div>
            <div className={styles.logo_text}>Office</div>
            <div className={styles.logo_sub}>CRM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
