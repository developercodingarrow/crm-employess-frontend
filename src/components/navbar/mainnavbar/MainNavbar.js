"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../css/mainnavbar.module.css";
import Image from "next/image";
import logoImg from "../../../../public/layer-thick-icon.png";
import { GoBell } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppContext } from "../../../_contextApi/AppContextProvider";
import { ReminderContext } from "../../../_contextApi/ReminderContextProvider";
import { upcomingRemindersActions } from "../../../app/utils/reminderActions";

export default function MainNavbar(props) {
  const { userRole } = props;

  console.log("userRole--", userRole);

  const [notificationCount, setnotificationCount] = useState(0);
  const [notificationReminders, setnotificationReminders] = useState([]);
  const { handelOpenReminders } = useContext(ReminderContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pathname = usePathname();

  const navigationItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Projects", href: "/projects" },
  ];
  const adminnavigationItems = [
    { id: 1, name: "Leads", href: "/admin/leads" },
    { id: 2, name: "Users", href: "/admin/users" },
  ];

  const handelget = async (req, res, next) => {
    try {
      const res = await upcomingRemindersActions();
      if (res.data.status === "success") {
        setnotificationReminders(res.data.formattedReminders);
        setnotificationCount(res.data.upcomingCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelget();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handelmobileViewClick = () => {
    setIsDropdownOpen(false);
    handelOpenReminders();
  };

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

            {userRole === "admin" && (
              <>
                {adminnavigationItems.map((item, index) => (
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
              </>
            )}
          </div>
        </div>

        <div className={styles.right_column}>
          <div className={styles.user_role}>{userRole}</div>

          {/* Notification Bell with Dropdown */}
          <div className={styles.notification_wrapper} ref={dropdownRef}>
            <div className={styles.notification} onClick={toggleDropdown}>
              <GoBell />
              {notificationCount > 0 && (
                <span className={styles.notification_badge}>
                  {notificationCount}
                </span>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className={styles.dropdown_menu}>
                <div className={styles.dropdown_header}>
                  <h4>Notifications</h4>
                  <span className={styles.dropdown_count}>
                    {notificationCount} new
                  </span>
                </div>

                <div className={styles.dropdown_body}>
                  {notificationCount > 0 ? (
                    notificationReminders?.map((reminder) => (
                      <div
                        key={reminder.id}
                        className={styles.notification_item}
                      >
                        <div className={styles.notification_content}>
                          <p className={styles.notification_message}>
                            {reminder.message}
                          </p>
                          <span className={styles.notification_time}>
                            {reminder.time}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.no_notifications}>
                      <GoBell className={styles.no_notif_icon} />
                      <p>No upcoming reminders</p>
                      <span>You're all caught up!</span>
                    </div>
                  )}
                </div>

                <div className={styles.dropdownLink_footer}>
                  <Link href="/" className={styles.view_all_link}>
                    View All Reminders
                  </Link>
                </div>
                <div className={styles.dropdownclick_footer}>
                  <div
                    className={styles.view_all_link}
                    onClick={handelmobileViewClick}
                  >
                    View All Reminders
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
