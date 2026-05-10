"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Cart.module.css';
import { useCart } from '@/context/CartContext';
import { getWhatsAppContactLink } from '@/frontend/lib/contact';

const CartPage = () => {
    const { cart, removeFromCart, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        const lines = cart.map(item => `- ${item.name} (${item.size}) x ${item.quantity} - PKR ${item.price * item.quantity}`);
        const message = `New Order from Wool Power\n\n${lines.join("\n")}\n\nTotal: PKR ${totalPrice}`;
        window.open(getWhatsAppContactLink(message), '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h1>Your cart is empty</h1>
                <p>Looks like you haven&apos;t added any handmade treasures yet.</p>
                <Link href="/" className={styles.shopBtn}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Shopping Cart</h1>

            <div className={styles.cartGrid}>
                <div className={styles.items}>
                    {cart.map((item) => (
                        <div key={`${item.id}-${item.size}`} className={styles.item}>
                            <div className={styles.itemImage}>
                                <Image src={item.image} alt={item.name} width={100} height={120} />
                            </div>
                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <p className={styles.itemSize}>Size: {item.size}</p>
                                <p className={styles.itemPrice}>PKR {item.price.toLocaleString()}</p>
                                <button
                                    onClick={() => removeFromCart(item.id, item.size)}
                                    className={styles.removeBtn}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className={styles.itemQuantity}>
                                Qty: {item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h3>Order Summary</h3>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>PKR {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>FREE</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>PKR {totalPrice.toLocaleString()}</span>
                    </div>

                    <button className={styles.checkoutBtn} onClick={handleCheckout}>
                        Order via WhatsApp
                    </button>

                    <button className={styles.clearBtn} onClick={clearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
