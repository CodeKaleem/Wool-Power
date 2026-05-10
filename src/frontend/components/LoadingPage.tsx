"use client";

import React, { useEffect, useState } from 'react';
import styles from './LoadingPage.module.css';

const LoadingPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500); // 2.5 seconds loading duration

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.yarnBall}>
                    <div className={styles.strand1}></div>
                    <div className={styles.strand2}></div>
                    <div className={styles.strand3}></div>
                    <div className={styles.core}></div>
                </div>
                <h1 className={styles.logoText}>Wool Power</h1>
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
