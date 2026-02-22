"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./leadmessenger.module.css";
import {
  GoSearch,
  GoBookmark,
  GoPerson,
  GoPaperAirplane,
  GoSmiley,
} from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { AppContext } from "../../../_contextApi/AppContextProvider";
import {
  leadRemarksAction,
  createLeadRemak,
} from "../../../app/utils/remakesActions";

// Sample data for demonstration
const sampleLeads = [
  {
    id: 1,
    name: "Rajesh Kumar",
    status: "Interested",
    lastMessage: "When can I schedule a site visit?",
    lastMessageTime: "10:30 AM",
    unread: 2,
    isBookmarked: true,
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Priya Sharma",
    status: "Follow-up",
    lastMessage: "Thanks for the quotation",
    lastMessageTime: "Yesterday",
    unread: 0,
    isBookmarked: false,
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Amit Patel",
    status: "Converted",
    lastMessage: "Deal closed! Thank you",
    lastMessageTime: "Yesterday",
    unread: 0,
    isBookmarked: true,
    phone: "+91 98765 43212",
  },
  {
    id: 4,
    name: "Neha Gupta",
    status: "New",
    lastMessage: "Interested in luxury apartments",
    lastMessageTime: "2 days ago",
    unread: 1,
    isBookmarked: false,
    phone: "+91 98765 43213",
  },
];

// Sample remarks/messages for selected lead
const sampleRemarks = [
  {
    id: 1,
    sender: "You",
    message:
      "Hi Rajesh, thanks for your interest. When would you like to visit?",
    time: "10:32 AM",
    isMe: true,
  },
  {
    id: 2,
    sender: "Rajesh Kumar",
    message: "I'm free this Saturday around 11 AM. Is that available?",
    time: "10:35 AM",
    isMe: false,
  },
  {
    id: 3,
    sender: "You",
    message: "Yes, Saturday 11 AM works. I'll send you the address.",
    time: "10:38 AM",
    isMe: true,
  },
  {
    id: 4,
    sender: "You",
    message: "Here's the location: Sunrise Apartments, Whitefield",
    time: "10:39 AM",
    isMe: true,
  },
];

export default function LeadMessenger(props) {
  const { projectLeads } = props;
  const messagesEndRef = useRef(null);

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

  const handleLeadSelect = async (lead) => {
    console.log("selectedid", lead);
    setSelectedLead(lead);
    // Add this line if you have setSelectedLeadMobile in context
    if (setSelectedLeadMobile) {
      setSelectedLeadMobile(lead);
    }
    // Check if mobile view
    if (window.innerWidth <= 768) {
      openMobileChat(lead);
    }

    try {
      const res = await leadRemarksAction(lead.id);
      console.log("res-leads selection", res);
      setSelectedLead(res.data.data.lead);
      setleadRemarks(res.data.data.remarks);
    } catch (error) {
      console.log("error--", error);
    }
  };

  // Auto-scroll to top when new message arrives
  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [leadRemarks]); // This runs whenever leadRemarks changes

  const handelCreatenewRemark = async (leadID) => {
    setIsSending(true);
    try {
      const remarks = messageInput;
      const payload = { remarks };
      console.log("leadID---", leadID);
      console.log("payload--", payload);
      const res = await createLeadRemak(payload, leadID);
      console.log("res--", res);
      // ✅ Transform the response to match your leadRemarks format
      if (res.data.status === "success") {
        const newRemark = res.data.data.remark;
        console.log("res---", res.data);
        // Transform to match your UI format
        const transformedRemark = {
          id: newRemark.id,
          sender: "You", // Since current user created it
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
      }
    } catch (error) {
      console.log("error---", error);
      setIsSending(false);
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
                      {lead.unread > 0 && (
                        <span className={styles.unread_badge}>
                          {lead.unread}
                        </span>
                      )}
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
                    ← {/* You can use text or icon */}
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
                  <button className={styles.action_btn}>
                    <GoBookmark />
                  </button>
                  <button className={styles.action_btn}>
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className={styles.messages_area}>
                {leadRemarks.map((remark) => (
                  <div
                    key={remark.id}
                    className={`${styles.message_wrapper} ${remark.isMe ? styles.my_message : styles.their_message}`}
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
                  <button className={styles.attach_btn}>
                    <IoMdAttach />
                  </button>
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
