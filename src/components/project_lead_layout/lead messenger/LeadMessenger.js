"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import router
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./leadmessenger.module.css";
import {
  GoSearch,
  GoBookmark,
  GoPerson,
  GoPaperAirplane,
  GoSmiley,
} from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiAlarmClock } from "react-icons/gi";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdAttach } from "react-icons/io";
import { AppContext } from "../../../_contextApi/AppContextProvider";
import {
  leadRemarksAction,
  createLeadRemak,
} from "../../../app/utils/remakesActions";
import LeadStatus from "./LeadStatus";
import { ReminderContext } from "../../../_contextApi/ReminderContextProvider";
import { changeLeadStatusAction } from "../../../app/utils/leadActions";

export default function LeadMessenger(props) {
  const router = useRouter(); // Initialize router
  const { projectLeads } = props;
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { handelOpenReminderForm } = useContext(ReminderContext);
  const {
    isMobileChatOpen,
    openMobileChat,
    closeMobileChat,
    selectedLeadMobile,
    setSelectedLeadMobile,
  } = useContext(AppContext);
  const [selectedLead, setSelectedLead] = useState();
  const [leadRemarks, setleadRemarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const filteredLeads = projectLeads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Update selectedLead when mobile lead changes
  useEffect(() => {
    if (selectedLeadMobile) {
      setSelectedLead(selectedLeadMobile);
    }
  }, [selectedLeadMobile]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      // Scroll the container, not the whole page
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [leadRemarks]);

  const handleLeadSelect = async (lead) => {
    setSelectedLead(lead);
    if (setSelectedLeadMobile) {
      setSelectedLeadMobile(lead);
    }
    // Check if mobile view
    if (window.innerWidth <= 768) {
      openMobileChat(lead);
    }

    try {
      const res = await leadRemarksAction(lead.id);

      // Check if response has error
      if (res.error) {
        toast.error(res.error);
        return;
      }
      if (res.data.status === "success") {
        setSelectedLead(res.data.data.lead);
        setleadRemarks(res.data.data.remarks);
      }
    } catch (error) {
      console.error("Error selecting lead:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handelCreatenewRemark = async (leadID) => {
    // Don't send empty messages
    if (!messageInput.trim()) {
      toast.warning("Please enter a message");
      return;
    }
    setIsSending(true);
    try {
      const remarks = messageInput;
      const payload = { remarks };
      const res = await createLeadRemak(payload, leadID);

      // Check if there's an error in the response
      if (res.error) {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSending(false);
        return;
      }

      // ✅ Transform the response to match your leadRemarks format
      if (res.data.status === "success") {
        const newRemark = res.data.data.remark;
        // Transform to match your UI format
        const transformedRemark = {
          id: newRemark.id,
          sender: "employee", // Since current user created it
          message: newRemark.remarks,
          time: "just now", // You need to create this function
          isMe: true,
        };

        // ✅ Correct - adds to BOTTOM (end of array)
        setleadRemarks((prevRemarks) => [...prevRemarks, transformedRemark]);

        // Force re-render
        setRefreshTrigger((prev) => prev + 1);

        setMessageInput("");
        setIsSending(false);
      } else {
        toast.error(res.data?.message || "Failed to add remark", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus, leadId) => {
    const formData = {
      status: newStatus,
    };

    try {
      const res = await changeLeadStatusAction(formData, leadId);
      // Check for error
      if (res.error) {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
      if (res.data.status === "success") {
        const transformedRemark = {
          id: res.data.data.remark.id,
          sender: "employee", // Since current user created it
          message: res.data.data.remark.remarks,
          time: "just now", // You need to create this function
          isMe: true,
        };
        // ✅ Correct - adds to BOTTOM (end of array)
        setleadRemarks((prevRemarks) => [...prevRemarks, transformedRemark]);
        // Force re-render
        setRefreshTrigger((prev) => prev + 1);
        router.refresh(); // This refreshes server components
      } else {
        toast.error(res.data?.message || "Failed to update status", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Status change error:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#3b82f6";
      case "Interested":
        return "#10b981";
      case "Follow-up":
        return "#f59e0b";
      case "Converted":
        return "#8b5cf6";
      default:
        return "#64748b";
    }
  };

  return (
    <div className={styles.main_container}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 99999,
          fontSize: "14px",
        }}
      />
      <div className={styles.inner_container}>
        {/* Left Column - Leads List (30%) */}
        <div
          className={`${styles.leads_column} ${isMobileChatOpen ? styles.hide_on_mobile : ""}`}
        >
          {/* Search Bar */}
          <div className={styles.search_container}>
            <div className={styles.search_wrapper}>
              <GoSearch className={styles.search_icon} />
              <input
                type="text"
                placeholder="Search leads..."
                className={styles.search_input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Leads List */}
          <div className={styles.leads_list}>
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className={`${styles.lead_item} ${selectedLead?.id === lead.id ? styles.selected : ""}`}
                onClick={() => handleLeadSelect(lead)}
              >
                {/* Avatar Icon */}
                <div className={styles.lead_avatar}>
                  <GoPerson />
                </div>

                {/* Lead Info */}
                <div className={styles.lead_info}>
                  <div className={styles.lead_header}>
                    <span className={styles.lead_name}>{lead.name}</span>
                    <div className={styles.lead_meta}>
                      <span className={styles.lead_time}>
                        {lead.lastMessageTime}
                      </span>
                      {lead.isBookmarked && (
                        <GoBookmark className={styles.bookmark_icon} />
                      )}
                    </div>
                  </div>

                  <div className={styles.lead_footer}>
                    <span className={styles.lead_lastMessage}>
                      {lead.lastMessage}
                    </span>
                    <div className={styles.lead_status_wrapper}>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Remarks/Conversation (70%) */}
        <div
          className={`${styles.leads_remarksColumn} ${isMobileChatOpen ? styles.mobile_chat_open : ""}`}
        >
          {selectedLead ? (
            <>
              {/* Conversation Header */}
              <div className={styles.conversation_header}>
                <div className={styles.conversation_user}>
                  <button
                    className={`${styles.mobile_back_btn} ${isMobileChatOpen ? styles.show : ""}`}
                    onClick={closeMobileChat}
                  >
                    <IoMdArrowBack />
                  </button>
                  <div className={styles.user_avatar}>
                    <GoPerson />
                  </div>
                  <div className={styles.user_info}>
                    <h3 className={styles.user_name}>{selectedLead.name}</h3>
                    <div className={styles.user_status}>
                      <span
                        className={styles.status_badge}
                        style={{
                          backgroundColor: `${getStatusColor(selectedLead.status)}20`,
                          color: getStatusColor(selectedLead.status),
                        }}
                      >
                        {selectedLead.status}
                      </span>
                      <span className={styles.user_phone}>
                        {selectedLead.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.conversation_actions}>
                  <button
                    className={styles.action_btn}
                    onClick={() =>
                      handelOpenReminderForm(selectedLead.id, selectedLead.name)
                    }
                  >
                    <GiAlarmClock />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className={styles.messages_area}>
                {leadRemarks.map((remark) => (
                  <div
                    ref={messagesContainerRef}
                    key={remark.id}
                    className={`${styles.message_wrapper} ${remark.sender === "employee" ? styles.my_message : styles.their_message}`}
                  >
                    <div className={styles.message_bubble}>
                      <p className={styles.message_text}>{remark.message}</p>
                      <span className={styles.message_time}>{remark.time}</span>
                    </div>
                  </div>
                ))}
                {/* Add this empty div at the end for scrolling */}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className={styles.message_input_container}>
                <div className={styles.message_input_wrapper}>
                  <button className={styles.emoji_btn}>
                    <GoSmiley />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles.message_input}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Prevent new line
                        if (messageInput.trim()) {
                          handelCreatenewRemark(selectedLead.id);
                        }
                      }
                    }}
                  />
                  <div className={styles.attach_btn}>
                    {/* Replace attach button with LeadStatus */}
                    <LeadStatus
                      leadId={selectedLead?.id}
                      onStatusSelect={handleStatusChange}
                    />
                  </div>
                  <button
                    className={styles.send_btn}
                    onClick={(e) => handelCreatenewRemark(selectedLead.id)}
                  >
                    <GoPaperAirplane />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.no_lead_selected}>
              <p>Select a lead to start conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
