import React from "react";
import styles from "./leadcard.module.css";
import { GoMail, GoDeviceMobile, GoTag } from "react-icons/go";

export default function LeadCard({ lead }) {
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
        return "#64748b";
      case "Converted":
        return "#059669";
      case "Lost":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "Website":
        return "🌐";
      case "Walk-in":
        return "🚶";
      case "Referral":
        return "🤝";
      case "Phone Call":
        return "📞";
      default:
        return "📋";
    }
  };

  return (
    <div className={styles.lead_card}>
      <div className={styles.lead_card_header}>
        <div className={styles.lead_avatar}>{lead.name.charAt(0)}</div>
        <div className={styles.lead_info}>
          <h3 className={styles.lead_name}>{lead.name}</h3>
          <span className={styles.lead_source}>
            {getSourceIcon(lead.source)} {lead.source}
          </span>
        </div>
        <span
          className={styles.lead_status}
          style={{
            backgroundColor: `${getStatusColor(lead.status)}20`,
            color: getStatusColor(lead.status),
          }}
        >
          {lead.status}
        </span>
      </div>

      <div className={styles.lead_card_body}>
        <div className={styles.lead_contact}>
          <GoMail className={styles.contact_icon} />
          <span className={styles.contact_text}>{lead.email}</span>
        </div>
        <div className={styles.lead_contact}>
          <GoDeviceMobile className={styles.contact_icon} />
          <span className={styles.contact_text}>{lead.phone}</span>
        </div>
      </div>
    </div>
  );
}
