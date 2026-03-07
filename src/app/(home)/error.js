// app/(home)/error.js
"use client";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";
import { GoAlert, GoHome } from "react-icons/go";

export default function PageError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Home page error:", error);
  }, [error]);

  // Get the error message
  const errorMessage = error?.message || "Something went wrong";

  // Check if it's a permission error
  const isPermissionError = errorMessage.toLowerCase().includes("permission");
  const isAuthError =
    errorMessage.toLowerCase().includes("authenticated") ||
    errorMessage.toLowerCase().includes("login");

  return (
    <div className={styles.container}>
      <div className={styles.errorCard}>
        <div className={styles.iconContainer}>
          <GoAlert className={styles.alertIcon} />
        </div>

        <h1 className={styles.title}>
          {isPermissionError
            ? "Access Denied"
            : isAuthError
              ? "Authentication Required"
              : "Something Went Wrong"}
        </h1>

        <p className={styles.message}>{errorMessage}</p>

        <div className={styles.actions}>
          {isAuthError ? (
            <Link href="/auth/login" className={styles.loginBtn}>
              Go to Login
            </Link>
          ) : (
            <Link href="/auth/login" className={styles.loginBtn}>
              <GoHome /> Go to Login
            </Link>
          )}

          <button onClick={() => reset()} className={styles.tryAgainBtn}>
            Try Again
          </button>
        </div>

        <div className={styles.helpText}>
          <p>If you continue to have issues, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
