"use client";

import React, { createContext, useContext, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity" | "size">, size?: string) => void;
    removeFromCart: (id: number, size?: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Omit<CartItem, "quantity" | "size">, size?: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.size === size);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.size === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, size }];
        });
    };

    const removeFromCart = (id: number, size?: string) => {
        setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
