"use client";
import React from "react";
import styles from "./leadstatus.module.css";
import { IoMdAttach } from "react-icons/io"; // Add this import
import { changeLeadStatusAction } from "../../../app/utils/leadActions";

const statusOptions = [
  "New",
  "Contacted",
  "Follow-up",
  "Interested",
  "Not Interested",
  "Converted",
  "Lost",
];

export default function LeadStatus({ onStatusSelect, leadId }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handelstatus = (status) => {
    onStatusSelect(status, leadId);
    setIsOpen(false);
  };

  return (
    <div className={styles.status_container} ref={dropdownRef}>
      <button
        className={styles.status_trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          <IoMdAttach />
        </span>
      </button>

      {isOpen && (
        <div className={styles.status_dropdown}>
          {statusOptions.map((status) => (
            <div
              key={status}
              className={styles.status_option}
              onClick={() => handelstatus(status)}
            >
              <span
                className={styles.status_dot}
                style={{
                  backgroundColor: getStatusColor(status),
                }}
              />
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "New":
      return "#3b82f6";
    case "Contacted":
      return "#8b5cf6";
    case "Follow-up":
      return "#f59e0b";
    case "Interested":
      return "#10b981";
    case "Not Interested":
      return "#ef4444";
    case "Converted":
      return "#8b5cf6";
    case "Lost":
      return "#64748b";
    default:
      return "#64748b";
  }
};
