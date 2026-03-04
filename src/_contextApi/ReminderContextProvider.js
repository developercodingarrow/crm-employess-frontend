"use client";
import React, { createContext, useState, useCallback } from "react";
export const ReminderContext = createContext();

export default function ReminderContextProvider({ children }) {
  // Reminder Notification States
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [reminderQueue, setReminderQueue] = useState([]);
  const [notifiedReminders, setNotifiedReminders] = useState(new Set());
  // NEW: Form states
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [leadName, setleadName] = useState("");
  const [isOpenReminder, setisOpenReminder] = useState(false);

  // NEW: Function to open form with leadId
  const handelOpenReminderForm = useCallback((id, selectedname) => {
    setLeadId(id);
    setleadName(selectedname);
    setShowReminderForm(true);
  }, []);

  // NEW: Function to close form
  const handelCloseReminderForm = useCallback(() => {
    setShowReminderForm(false);
    setLeadId("");
  }, []);

  // Reminder Functions
  const checkReminders = (reminders) => {
    const now = new Date();

    reminders.forEach((reminder) => {
      const reminderTime = new Date(reminder.reminderTime);
      const timeDiff = reminderTime - now;
      const secondsDiff = Math.floor(timeDiff / 1000);

      // Show if within 15 seconds and not already notified
      if (
        secondsDiff <= 15 &&
        secondsDiff >= 0 &&
        !notifiedReminders.has(reminder._id)
      ) {
        // Add to queue
        setReminderQueue((prev) => {
          if (!prev.some((r) => r._id === reminder._id)) {
            return [...prev, reminder];
          }
          return prev;
        });

        // If no popup showing, show this one
        if (!showReminderPopup) {
          setCurrentReminder(reminder);
          setShowReminderPopup(true);
        }
      }
    });
  };

  const showNextReminder = () => {
    if (reminderQueue.length > 0) {
      setCurrentReminder(reminderQueue[0]);
      setShowReminderPopup(true);
    }
  };

  const dismissReminder = (reminderId) => {
    setShowReminderPopup(false);
    setNotifiedReminders((prev) => new Set(prev).add(reminderId));
    setReminderQueue((prev) => prev.filter((r) => r._id !== reminderId));

    // Show next reminder if any
    setTimeout(() => {
      showNextReminder();
    }, 500);
  };

  const snoozeReminder = (reminderId, minutes = 5) => {
    setShowReminderPopup(false);

    // Update reminder time by adding minutes
    setReminderQueue((prev) =>
      prev.map((r) => {
        if (r._id === reminderId) {
          const newTime = new Date(r.reminderTime);
          newTime.setMinutes(newTime.getMinutes() + minutes);
          return { ...r, reminderTime: newTime, snoozed: true };
        }
        return r;
      }),
    );

    // Remove from notified set to allow re-notification
    setNotifiedReminders((prev) => {
      const newSet = new Set(prev);
      newSet.delete(reminderId);
      return newSet;
    });

    // Show next reminder if any
    setTimeout(() => {
      showNextReminder();
    }, 500);
  };

  // NEW: Function to create a test reminder
  const createTestReminder = useCallback(async (reminderData) => {
    try {
      // Optional: Add to queue for testing
      const testReminder = {
        _id: "test-" + Date.now(),
        lead: { name: "Test Lead", phone: "1234567890" },
        ...reminderData,
        reminderTime: new Date(reminderData.reminderTime).toISOString(),
      };

      setReminderQueue((prev) => [...prev, testReminder]);

      return { success: true, reminder: testReminder };
    } catch (error) {
      console.error("Error creating reminder:", error);
      return { success: false, error };
    }
  }, []);

  const handelCloseReminders = () => {
    setisOpenReminder(false);
  };

  const handelOpenReminders = () => {
    setisOpenReminder(true);
  };

  return (
    <ReminderContext.Provider
      value={{
        showReminderForm,
        leadId,
        leadName,
        handelOpenReminderForm,
        handelCloseReminderForm,
        setShowReminderPopup,
        // Reminder Context
        showReminderPopup,
        currentReminder,
        reminderQueue,
        checkReminders,
        dismissReminder,
        snoozeReminder,
        createTestReminder,
        isOpenReminder,
        setisOpenReminder,
        handelCloseReminders,
        handelOpenReminders,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}
