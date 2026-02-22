"use client";
import React, { useState } from "react";
import styles from "./leadpageLayout.module.css";
import { GoPlus, GoFilter, GoSearch, GoUpload } from "react-icons/go";
import { dummyLeads } from "../../jsonData/dummyData";
import LeadCard from "./lead_card/LeadCard";
import BulkUpload from "./Bulk_lead_Upload/BulkUpload";
import CreateLeadForm from "./Create_Lead_Form/CreateLeadForm";
import { createNewLead } from "../../app/utils/adminAction";

export default function LeadsPageLayout(props) {
  const { apiLead } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(true); // Toggle between form and bulk upload
  const [leads, setLeads] = useState(apiLead);

  const sources = [
    "All",
    "Website",
    "Walk-in",
    "Referral",
    "Phone Call",
    "Social Media",
    "Campaign",
    "Other",
  ];

  // Filter leads based on search and source
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    const matchesSource =
      selectedSource === "All" || lead.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const handleAddLead = async (newLead) => {
    try {
      const res = await createNewLead(newLead);

      if (res.data.status === "success") {
        const createdLead = res.data.data; // or res.data depending on your API structure
        // Format the lead to match your frontend structure
        const formattedLead = {
          name: createdLead.name,
          phone: createdLead.phone,
          email: createdLead.email,
          source: createdLead.source,
          status: createdLead.status,
          // Add any other fields you need
        };

        // Update leads state with formatted lead
        setLeads((prevLeads) => [formattedLead, ...prevLeads]);
      }
    } catch (error) {
      console.log("error-", error);
    }
  };

  const handleBulkUpload = (uploadedLeads) => {
    // Add uploaded leads to your existing leads list
    setLeads((prevLeads) => [...uploadedLeads, ...prevLeads]);

    // You can also show a success toast/notification
    console.log(`${uploadedLeads.length} leads uploaded successfully`);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.page_header}>
        <h1 className={styles.page_title}>Leads Management</h1>
        <p className={styles.page_subtitle}>
          Manage and track your leads efficiently
        </p>
      </div>

      <div className={styles.inner_container}>
        {/* Left Column - Leads List */}
        <div className={styles.leads_column}>
          {/* Search and Filter Bar */}
          <div className={styles.search_filter_container}>
            <div className={styles.search_wrapper}>
              <GoSearch className={styles.search_icon} />
              <input
                type="text"
                placeholder="Search leads by name, email or phone..."
                className={styles.search_input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.filter_container}>
              <div className={styles.filter_icon}>
                <GoFilter />
              </div>
              <select
                className={styles.filter_select}
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Leads Stats */}
          <div className={styles.leads_stats}>
            <div className={styles.stat_item}>
              <span className={styles.stat_value}>{filteredLeads.length}</span>
              <span className={styles.stat_label}>Total Leads</span>
            </div>
            <div className={styles.stat_item}>
              <span className={styles.stat_value}>
                {filteredLeads.filter((l) => l.status === "New").length}
              </span>
              <span className={styles.stat_label}>New</span>
            </div>
            <div className={styles.stat_item}>
              <span className={styles.stat_value}>
                {filteredLeads.filter((l) => l.status === "Interested").length}
              </span>
              <span className={styles.stat_label}>Interested</span>
            </div>
          </div>

          {/* Leads List */}
          <div className={styles.leads_list}>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <LeadCard key={index} lead={lead} />
              ))
            ) : (
              <div className={styles.no_leads}>
                <p>No leads found matching your criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Create Lead & Bulk Upload */}
        <div className={styles.create_leadColumn}>
          {/* Toggle Buttons */}
          <div className={styles.toggle_container}>
            <button
              className={`${styles.toggle_btn} ${showCreateForm ? styles.active : ""}`}
              onClick={() => setShowCreateForm(true)}
            >
              <GoPlus className={styles.toggle_icon} />
              <span>Create Lead</span>
            </button>
            <button
              className={`${styles.toggle_btn} ${!showCreateForm ? styles.active : ""}`}
              onClick={() => setShowCreateForm(false)}
            >
              <GoUpload className={styles.toggle_icon} />
              <span>Bulk Upload</span>
            </button>
          </div>

          {/* Content */}
          <div className={styles.content_container}>
            {showCreateForm ? (
              <CreateLeadForm onAddLead={handleAddLead} />
            ) : (
              <BulkUpload onUpload={handleBulkUpload} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
