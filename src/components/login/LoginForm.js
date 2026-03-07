"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./css/loginform.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoMail, GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { API_BASE_URL } from "../../../config";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.status === "success") {
        document.cookie = `jwt=${result.token}; path=/; max-age=86400;`; // 1 day
        document.cookie = `user=${JSON.stringify(
          result.data,
        )}; path=/; max-age=86400;`;

        router.push("/"); // Redirect to dashboard
        router.refresh(); // Refresh server components if needed
        setIsLoading(false);
      } else {
        // Error toast from backend
        toast.error(result.message || "Login failed", {
          position: "bottom-center",
          autoClose: 5000,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("login error:", error);
      toast.error("Network error. Please try again.", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.login_card}>
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
      {/* Logo and Title */}
      <div className={styles.logo_section}>
        <div className={styles.logo_wrapper}>
          <div className={styles.logo_icon}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="url(#gradient)" />
              <path
                d="M12 20L18 26L28 14"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.logo_text}>
            <span className={styles.logo_main}>Office</span>
            <span className={styles.logo_sub}>CRM</span>
          </div>
        </div>
        <h1 className={styles.welcome_title}>Welcome Back!</h1>
        <p className={styles.welcome_subtitle}>
          Sign in to continue to your dashboard
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        {/* Email Field */}
        <div className={styles.input_group}>
          <div className={styles.input_icon}>
            <GoMail />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className={`${styles.input_field} ${errors.email ? styles.input_error : ""}`}
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
        <div className={styles.input_group}>
          <div className={styles.input_icon}>
            <GoLock />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${styles.input_field} ${errors.password ? styles.input_error : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            className={styles.password_toggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </button>
          {errors.password && (
            <span className={styles.error_message}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.login_button}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.loading_spinner}></span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Demo Credentials (for testing) */}
      <div className={styles.demo_credentials}>
        <p className={styles.demo_title}>Demo Credentials</p>
        <div className={styles.demo_item}>
          <span className={styles.demo_label}>Email:</span>
          <span className={styles.demo_value}>admin@gmail.com</span>
        </div>
        <div className={styles.demo_item}>
          <span className={styles.demo_label}>Password:</span>
          <span className={styles.demo_value}>1234567890</span>
        </div>
      </div>
    </div>
  );
}
