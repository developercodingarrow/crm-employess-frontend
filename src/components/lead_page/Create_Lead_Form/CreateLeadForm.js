"use client";
import React, { useState } from "react";
import styles from "./createform.module.css";
import { GoX } from "react-icons/go";

export default function CreateLeadForm({ onAddLead }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website",
    status: "New",
  });

  const sources = [
    "Website",
    "Walk-in",
    "Referral",
    "Phone Call",
    "Social Media",
    "Campaign",
    "Other",
  ];
  const statuses = [
    "New",
    "Contacted",
    "Follow-up",
    "Interested",
    "Not Interested",
    "Converted",
    "Lost",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLead(formData);
    setFormData({
      name: "",
      phone: "",
      email: "",
      source: "Website",
      status: "New",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.create_form}>
      <h3 className={styles.form_title}>Add New Lead</h3>

      <div className={styles.form_group}>
        <label className={styles.form_label}>Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter lead name"
          className={styles.form_input}
          required
        />
      </div>

      <div className={styles.form_group}>
        <label className={styles.form_label}>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className={styles.form_input}
          required
        />
      </div>

      <div className={styles.form_group}>
        <label className={styles.form_label}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className={styles.form_input}
        />
      </div>

      <div className={styles.form_row}>
        <div className={styles.form_group}>
          <label className={styles.form_label}>Source</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className={styles.form_select}
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.form_group}>
          <label className={styles.form_label}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.form_select}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className={styles.submit_btn}>
        Create Lead
      </button>
    </form>
  );
}
