"use client";
import React from "react";
import { useContext } from "react";
import styles from "./userformmodal.module.css";

import { GoX } from "react-icons/go";
import { AppContext } from "../../../_contextApi/AppContextProvider";
import UserForm from "../User_Form/UserForm";

export default function UserFormModal({ onSubmit }) {
  const { isUserFormOpen, closeUserForm } = useContext(AppContext);

  if (!isUserFormOpen) return null;

  const handleSubmit = (userData) => {
    onSubmit(userData);
    closeUserForm();
  };

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={closeUserForm}></div>

      {/* Modal */}
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3 className={styles.modal_title}>Create New User</h3>
          <button className={styles.close_btn} onClick={closeUserForm}>
            <GoX />
          </button>
        </div>
        <div className={styles.modal_content}>
          <UserForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
