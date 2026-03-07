"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./userform.module.css";
import { GoMail, GoLock, GoPerson } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im"; // Add spinner icon
import { createNewUser } from "../../../app/utils/adminAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserForm({ onSubmit }) {
  const [selectedRole, setSelectedRole] = useState("employee");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: "⚙️",
      description: "Manage users and projects",
    },
    {
      id: "employee",
      label: "Employee",
      icon: "👤",
      description: "Regular team member",
    },
  ];

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true); // Start spinner
    const userData = {
      ...data,
      role: selectedRole,
    };

    // Show loading toast
    const loadingToast = toast.loading("Creating user...");

    try {
      const res = await createNewUser(userData);
      console.log("create user", res);

      // Check for error
      if (res.error) {
        toast.dismiss(loadingToast);

        // Try to extract clean error message
        let errorMessage = res.error;

        // If error contains JSON, try to parse it
        if (res.error.includes('{"status":"Fails","message":"')) {
          try {
            const match = res.error.match(
              /\{"status":"Fails","message":"([^"]+)"\}/,
            );
            if (match) {
              errorMessage = match[1];
            }
          } catch (e) {
            // Keep original error
          }
        }

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSubmitting(false); // Stop spinner
        return;
      }

      // Check if API returned success
      if (res.data?.status === "success") {
        toast.dismiss(loadingToast);
        toast.success(res.data.message || "User created successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        // Call parent onSubmit if provided
        if (onSubmit) {
          onSubmit(userData);
        }

        // Reset form
        reset();
        setSelectedRole("employee");
        setIsSubmitting(false); // Stop spinner
      } else {
        toast.dismiss(loadingToast);
        toast.error(res.data?.message || "Failed to create user", {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSubmitting(false); // Stop spinner
      }
    } catch (error) {
      console.log("error---", error);
      setIsSubmitting(false); // Stop spinner
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div>
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
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.user_form}
      >
        {/* Name Field */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            <GoPerson className={styles.field_icon} />
            Full Name
          </label>
          <input
            type="text"
            className={`${styles.form_input} ${errors.name ? styles.input_error : ""}`}
            placeholder="Enter full name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <span className={styles.error_message}>{errors.name.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            <GoMail className={styles.field_icon} />
            Email Address
          </label>
          <input
            type="email"
            className={`${styles.form_input} ${errors.email ? styles.input_error : ""}`}
            placeholder="Enter email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error_message}>{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            <GoLock className={styles.field_icon} />
            Password
          </label>
          <input
            type="password"
            className={`${styles.form_input} ${errors.password ? styles.input_error : ""}`}
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className={styles.error_message}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Role Selection */}
        <div className={styles.form_group}>
          <label className={styles.form_label}>Select Role</label>
          <div className={styles.role_tabs}>
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                className={`${styles.role_tab} ${selectedRole === role.id ? styles.active : ""}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <span className={styles.role_icon}>{role.icon}</span>
                <div className={styles.role_info}>
                  <span className={styles.role_label}>{role.label}</span>
                  <span className={styles.role_desc}>{role.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submit_btn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <ImSpinner2 className={styles.spinner} />
            </>
          ) : (
            "Create User"
          )}
        </button>
      </form>
    </div>
  );
}
