"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
    const { totalItems } = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <div className={styles.brandWrap}>
                            <Image src="/logo.svg" alt="Wool Power Logo" width={42} height={42} priority />
                            <div className="text-3d perspective-1000 transform-style-3d" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
                                Wool Power
                            </div>                        </div>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <Link href="/cart" className={styles.cartLink}>
                        Cart <span>({totalItems})</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
