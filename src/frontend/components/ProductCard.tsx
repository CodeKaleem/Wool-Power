"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('Medium');

    const handleAddToCart = () => {
        addToCart({ id, name, price, image }, selectedSize);
        // Add 3D bounce feedback logic here or via CSS class
    };

    return (
        <div className={`${styles.cardWrapper} perspective-1000`}>
            <div className={`${styles.card} lift-3d glass-panel transform-style-3d`}>
                <div className={styles.imageContainer}>
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.categoryBadge}>{category}</div>
                </div>

                <div className={styles.info}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.price}>PKR {price.toLocaleString()}</p>

                    <div className={styles.sizeSelector}>
                        <label>Size:</label>
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                        </select>
                    </div>

                    <button className={styles.addButton} onClick={handleAddToCart}>
                        Add to Cart
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
