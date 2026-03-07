"use client";
import React, { useState } from "react";
import styles from "./loginui.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoMail, GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginUi() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.login_container}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.gradient_orb}></div>
        <div className={styles.gradient_orb2}></div>
        <div className={styles.grid_pattern}></div>
      </div>

      {/* Login Card */}
      <LoginForm />
    </div>
  );
}
