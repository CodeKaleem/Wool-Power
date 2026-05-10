"use client";

import React, { useActionState } from "react";
import styles from "../../auth/Auth.module.css";
import { login } from "@/backend/actions/authActions";

const WoolPowerLoginPage = () => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className={styles.container}>
      <div className={`${styles.authCard} glass-panel lift-3d`}>
        <h1 className={styles.title}>Wool Power Secure Login</h1>
        <p className={styles.subtitle}>Restricted access for authorized operators only.</p>

        {state?.error && (
          <div style={{ color: "#b42318", marginBottom: "1rem", textAlign: "center", fontWeight: "bold" }}>
            {state.error}
          </div>
        )}

        <form action={formAction} className={styles.form}>
          <div className={styles.inputGroup}>
            <input type="email" name="email" className={styles.input} placeholder=" " id="email" required />
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
          </div>

          <div className={styles.inputGroup}>
            <input type="password" name="password" className={styles.input} placeholder=" " id="password" required />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isPending}>
            {isPending ? "Verifying..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WoolPowerLoginPage;
