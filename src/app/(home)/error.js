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
  return (
    <div className={styles.container}>
      <div className={styles.errorCard}>
        <div className={styles.iconContainer}>
          <GoAlert className={styles.alertIcon} />
        </div>

        <h1 className={styles.title}>Authentication Required</h1>

        <p className={styles.message}>
          {error.message === "Not authenticated"
            ? "You need to be logged in to access this page."
            : "Something went wrong while loading this page."}
        </p>

        <div className={styles.actions}>
          <Link href="/login" className={styles.loginBtn}>
            Go to Login
          </Link>

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
