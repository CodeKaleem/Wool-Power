"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

const BackButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={styles.backButton}
            aria-label="Go back"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
        </button>
    );
};

export default BackButton;
