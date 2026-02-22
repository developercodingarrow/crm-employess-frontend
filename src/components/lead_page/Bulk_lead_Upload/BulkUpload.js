"use client";
import React, { useState, useCallback } from "react";
import styles from "./bulkupload.module.css";
import { GoUpload, GoFile, GoCheck, GoX } from "react-icons/go";
import { bulkUploadLeads } from "../../../app/utils/adminAction";

export default function BulkUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setUploadStatus(null);
      setErrorMessage("");
    } else {
      alert("Please upload a CSV file");
    }
  };

  // const handleUpload = useCallback(async () => {
  //   if (!file) return;

  //   setUploading(true);
  //   setUploadStatus(null);

  //   // Simulate CSV parsing and upload
  //   setTimeout(() => {
  //     // Mock successful upload
  //     const mockLeads = [
  //       {
  //         name: "Imported Lead 1",
  //         phone: "1234567890",
  //         email: "import1@test.com",
  //         source: "CSV Upload",
  //         status: "New",
  //       },
  //       {
  //         name: "Imported Lead 2",
  //         phone: "0987654321",
  //         email: "import2@test.com",
  //         source: "CSV Upload",
  //         status: "New",
  //       },
  //     ];

  //     onUpload(mockLeads);
  //     setUploadStatus("success");
  //     setFile(null);

  //     // Reset file input
  //     const fileInput = document.getElementById("csv-upload");
  //     if (fileInput) fileInput.value = "";

  //     setUploading(false);
  //   }, 2000);
  // }, [file, onUpload]);

  const handleUpload = useCallback(async () => {
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);
    setErrorMessage("");

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append("csvFile", file); // 'csvFile' must match backend field name

      // Call API
      const res = await bulkUploadLeads(formData);

      if (res.success) {
        // Extract inserted leads from response
        const uploadedLeads = res.data?.data?.leads || [];

        // Pass leads to parent component
        onUpload(uploadedLeads);

        setUploadStatus("success");
        setFile(null);

        // Reset file input
        const fileInput = document.getElementById("csv-upload");
        if (fileInput) fileInput.value = "";
      } else {
        setUploadStatus("error");
        setErrorMessage(res.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [file, onUpload]);

  const handleDownloadSample = () => {
    // Create sample CSV content
    const sampleContent =
      "name,phone,email,source,status\nJohn Doe,9876543210,john@example.com,Website,New\nJane Smith,9876543211,jane@example.com,Referral,Interested";
    const blob = new Blob([sampleContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_leads.csv";
    a.click();
  };

  return (
    <div className={styles.bulk_upload_container}>
      <h3 className={styles.form_title}>Bulk Upload Leads</h3>
      <p className={styles.upload_note}>
        Upload multiple leads at once using a CSV file
      </p>

      <div className={styles.upload_area}>
        <input
          type="file"
          id="csv-upload"
          accept=".csv"
          onChange={handleFileChange}
          className={styles.file_input}
        />
        <label htmlFor="csv-upload" className={styles.file_label}>
          <GoUpload className={styles.upload_icon} />
          <span>{file ? file.name : "Choose CSV file"}</span>
        </label>
      </div>

      {file && (
        <div className={styles.file_info}>
          <GoFile className={styles.file_icon} />
          <span className={styles.file_name}>{file.name}</span>
          <span className={styles.file_size}>
            {(file.size / 1024).toFixed(2)} KB
          </span>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className={styles.success_message}>
          <GoCheck className={styles.success_icon} />
          <span>Leads uploaded successfully!</span>
        </div>
      )}

      <div className={styles.upload_actions}>
        <button className={styles.sample_btn} onClick={handleDownloadSample}>
          Download Sample CSV
        </button>
        <button
          className={styles.upload_btn}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload Leads"}
        </button>
      </div>

      <div className={styles.csv_format}>
        <h4>CSV Format Required:</h4>
        <pre className={styles.csv_example}>name,phone,email,source,status</pre>
      </div>
    </div>
  );
}
