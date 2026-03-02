"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./reminderform.module.css";
import { IoMdClose } from "react-icons/io";
import { ReminderContext } from "../../../_contextApi/ReminderContextProvider";
import { createReminderAction } from "../../../app/utils/reminderActions";

export default function ReminderForm() {
  const { leadId, leadName, handelCloseReminderForm } =
    useContext(ReminderContext);

  const [formData, setFormData] = useState({
    leadId: leadId,
    reminderTime: "",
    message: "",
    type: "call",
    priority: "medium",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      leadId: leadId,
    }));
  }, [leadId]); // Runs whenever leadId changes

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    try {
      const res = await createReminderAction(formData);
      if (res.data.status === "success") {
        setResult({
          message: res.data.message,
          success: res.data.status,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log("error---", error);
    }

    // Reset form
    setIsSubmitting(false);
  };

  // Get current datetime in local format for input min
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1); // Minimum 1 minute from now
    return now.toISOString().slice(0, 16);
  };

  if (!leadId) return null; // Don't show if no leadId
  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h3>Create Test Reminder</h3>
          <button className={styles.closeBtn} onClick={handelCloseReminderForm}>
            <IoMdClose />
          </button>
        </div>

        <div className={styles.testInfo}>
          <p>
            Reminder for : <strong>{leadName}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="hidden"
              name="leadId"
              value={formData.leadId}
              required
            />
            <label>Reminder Time *</label>
            <input
              type="datetime-local"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              min={getCurrentDateTime()}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter reminder message"
              rows="3"
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="call">📞 Call</option>
                <option value="meeting">👥 Meeting</option>
                <option value="follow-up">🔄 Follow-up</option>
                <option value="task">✅ Task</option>
                <option value="other">📌 Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Test Reminder"}
          </button>

          {result && (
            <div
              className={`${styles.result} ${result.success ? styles.success : styles.error}`}
            >
              {result.message}
            </div>
          )}

          <div className={styles.note}>
            <p>⚡Timely follow-ups = happy clients</p>
          </div>
        </form>
      </div>
    </div>
  );
}
