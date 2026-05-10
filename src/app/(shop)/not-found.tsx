import Link from 'next/link';
import styles from './Home.module.css'; // Reusing global/home styles for consistency

export default function NotFound() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h2 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary-red-pink)', marginBottom: '1rem' }}>404</h2>
      <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Page Not Found</h3>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Oops! The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <button className={styles.ctaButton}>Return to Homepage</button>
      </Link>
    </div>
  );
}
