import React from "react";
import styles from "./reminders.module.css";
import {
  IoMdAlert,
  IoMdCall,
  IoMdMail,
  IoMdPeople,
  IoMdClose,
} from "react-icons/io";
import { MdAccessTime, MdNotificationsActive, MdDelete } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";

export default function Reminders(props) {
  const { reminders, onDeleteReminder, onclearAllReminder, deletingId } = props;

  // Separate reminders into active and notified
  const activeReminders = reminders.filter((r) => !r.isNotified);
  const notifiedReminders = reminders.filter((r) => r.isNotified);

  console.log("reminders--", reminders);

  // Helper function to format time
  const formatReminderTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((date - now) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 0) return "Overdue";
    if (diffMinutes < 60) return `in ${diffMinutes} min`;
    if (diffHours < 24)
      return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days left`;
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#64748b";
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "call":
        return <IoMdCall />;
      case "email":
        return <IoMdMail />;
      case "meeting":
        return <IoMdPeople />;
      default:
        return <IoMdAlert />;
    }
  };

  const handleDelete = (reminderId, e) => {
    e.stopPropagation();
    console.log("🗑️ Delete reminder:", reminderId);
    if (onDeleteReminder) {
      onDeleteReminder(reminderId);
    }
  };

  return (
    <div>
      <div className={styles.remindersCard}>
        <div className={styles.remindersHeader}>
          <h3>
            <MdNotificationsActive className={styles.remindersIcon} />
            Upcoming Reminders
          </h3>
          <span className={styles.remindersCount}>
            {activeReminders.length}
          </span>
        </div>

        {/* Active Reminders (isNotified: false) */}
        <div className={styles.remindersList}>
          {activeReminders.map((reminder) => (
            <div
              key={reminder._id}
              className={`${styles.reminderItem} ${deletingId === reminder._id ? styles.deleting : ""}`}
            >
              <div className={styles.reminderTime}>
                <span className={styles.timeBig}>
                  {new Date(reminder.reminderTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                <span
                  className={`${styles.timeLeft} ${new Date(reminder.reminderTime) < new Date() ? styles.overdue : ""}`}
                >
                  {formatReminderTime(reminder.reminderTime)}
                </span>
              </div>

              <div className={styles.reminderContent}>
                <div className={styles.reminderHeader}>
                  <span className={styles.leadName}>
                    {reminder.lead?.name || "Unknown Lead"}
                  </span>
                  <span
                    className={styles.priorityBadge}
                    style={{
                      background: `${getPriorityColor(reminder.priority)}15`,
                      color: getPriorityColor(reminder.priority),
                    }}
                  >
                    {reminder.priority}
                  </span>
                </div>

                <p className={styles.reminderMessage}>{reminder.message}</p>

                <div className={styles.reminderFooter}>
                  <span className={styles.reminderType}>
                    <span
                      className={styles.typeIcon}
                      style={{ color: getPriorityColor(reminder.priority) }}
                    >
                      {getTypeIcon(reminder.type)}
                    </span>
                    {reminder.type}
                  </span>
                  <span
                    className={styles.leadStatus}
                    style={{
                      background:
                        reminder.lead?.status === "Interested"
                          ? "#e0f7e9"
                          : reminder.lead?.status === "Follow-up"
                            ? "#fff3e0"
                            : reminder.lead?.status === "Not Interested"
                              ? "#fee9e9"
                              : "#f1f5f9",
                      color:
                        reminder.lead?.status === "Interested"
                          ? "#10b981"
                          : reminder.lead?.status === "Follow-up"
                            ? "#f59e0b"
                            : reminder.lead?.status === "Not Interested"
                              ? "#ef4444"
                              : "#64748b",
                    }}
                  >
                    {reminder.lead?.status || "Unknown"}
                  </span>
                </div>
              </div>

              {!reminder.isNotified && (
                <span className={styles.notificationDot}></span>
              )}
            </div>
          ))}

          {activeReminders.length === 0 && (
            <div className={styles.emptyMessage}>No upcoming reminders</div>
          )}
        </div>

        {/* Notified Reminders Section (isNotified: true) */}
        {notifiedReminders.length > 0 && (
          <>
            <div className={styles.divider}>
              <span>Completed Reminders</span>
            </div>

            <div className={styles.notifiedList}>
              {notifiedReminders.map((reminder) => (
                <div
                  key={reminder._id}
                  className={`${styles.reminderItem} ${styles.notifiedItem} ${deletingId === reminder._id ? styles.deleting : ""}`}
                >
                  <div className={styles.reminderTime}>
                    <span className={styles.timeBig}>
                      {new Date(reminder.reminderTime).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        },
                      )}
                    </span>
                  </div>

                  <div className={styles.reminderContent}>
                    <div className={styles.reminderHeader}>
                      <span className={styles.leadName}>
                        {reminder.lead?.name || "Unknown Lead"}
                      </span>
                      <span className={styles.notifiedBadge}>Notified</span>
                    </div>

                    <p className={styles.reminderMessage}>{reminder.message}</p>

                    <div className={styles.reminderFooter}>
                      <span className={styles.reminderType}>
                        <span className={styles.typeIcon}>
                          {getTypeIcon(reminder.type)}
                        </span>
                        {reminder.type}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => handleDelete(reminder._id, e)}
                    title="Delete reminder"
                    disabled={deletingId === reminder._id}
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear All Button */}
            <button
              className={styles.clearAllBtn}
              onClick={onclearAllReminder}
              disabled={deletingId !== null}
            >
              <MdDelete /> Clear All
            </button>
          </>
        )}

        <a href="#" className={styles.viewAllLink}>
          View all reminders →
        </a>
      </div>
    </div>
  );
}
