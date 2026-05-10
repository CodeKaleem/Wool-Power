/**
 * Simulated data layer for local development/demo.
 */
import { PRODUCTS, type Product } from "@/backend/constants/products";

export interface Order {
    id?: string;
    items: Product[];
    total: number;
    status: 'pending' | 'processing' | 'completed';
    createdAt: string;
}

// Simulated network delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDb = {
    /**
     * Fetches all products from the database.
     * @returns Promise<Product[]>
     */
    getProducts: async (): Promise<Product[]> => {
        await delay(800); // Simulate network latency
        return PRODUCTS;
    },

    /**
     * Saves a new order to the database.
     * @param order - The order payload
     */
    saveOrder: async (order: Omit<Order, 'id'>): Promise<{ success: boolean; orderId: string }> => {
        await delay(1200); // Simulate write latency
        
        if (!order.items || order.items.length === 0) {
            throw new Error("Cannot save an empty order");
        }

        const generatedId = `ORD-${Math.floor(Math.random() * 10000)}`;
        console.log(`[DB] Order ${generatedId} saved securely:`, order);
        
        return { success: true, orderId: generatedId };
    }
};
