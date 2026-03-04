import React from "react";
import styles from "./detailpage.module.css";
import { GoMail, GoDeviceMobile, GoBriefcase } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { PiBuildingLight } from "react-icons/pi";
import { BiBuilding } from "react-icons/bi";
import { FaCrown, FaHardHat } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsBricks } from "react-icons/bs";
export default function DetailPageHeader(props) {
  const { projectDetails } = props;

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.profile_left}>
          <div className={styles.avatar}>
            {" "}
            <PiBuildingLight />{" "}
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{projectDetails.propertyName}</h2>
            <div className={styles.userRole}>
              <span>
                <BsBricks className={styles.roleIcon} /> {projectDetails.type}
              </span>
              <span>
                <FaCrown className={styles.roleIcon} /> {projectDetails.builder}
              </span>
            </div>
            <div className={styles.userMeta}>
              <span>
                <GoLocation /> {projectDetails.city} {projectDetails.state}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.profile_right}>
          <div className={styles.large_font}>
            {formatPrice(projectDetails.minPrice)} -{" "}
            {formatPrice(projectDetails.maxPrice)}
          </div>
          <span className={styles.price_label}>Price Range</span>
        </div>
      </div>
    </div>
  );
}
