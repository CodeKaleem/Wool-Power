'use client';

import { useEffect } from 'react';
import styles from './Home.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a professional app, log the error to an error reporting service like Sentry
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className={styles.container} style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-maroon)', marginBottom: '1rem' }}>Something went wrong!</h2>
      <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '600px' }}>
        We sincerely apologize for the inconvenience. Our technical team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className={styles.ctaButton}
      >
        Try again
      </button>
    </div>
  );
}
