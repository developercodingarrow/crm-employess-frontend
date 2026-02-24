"use client";
import React, { useContext } from "react";
import styles from "./leaduploadmodel.module.css";
import { GoX, GoPlus, GoUpload } from "react-icons/go";
import BulkUpload from "../Bulk_lead_Upload/BulkUpload";
import CreateLeadForm from "../Create_Lead_Form/CreateLeadForm";
import { AppContext } from "../../../_contextApi/AppContextProvider";
export default function LeadUploadModel({ handleAddLead, handleBulkUpload }) {
  const {
    showCreateForm,
    setShowCreateForm,
    isLeadUplodOpen,
    setisLeadUplodOpen,
    closeLeadForm,
  } = useContext(AppContext);

  if (!isLeadUplodOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={closeLeadForm}></div>

      {/* Modal */}
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3 className={styles.modal_title}>Create or upload leads</h3>
          <button className={styles.close_btn} onClick={closeLeadForm}>
            <GoX />
          </button>
        </div>
        <div className={styles.modal_content}>
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
    </>
  );
}
