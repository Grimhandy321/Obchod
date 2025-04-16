import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types";

type ShoppingCartStore = {
    items: CartItem[];
    setItems: (newItems: CartItem[]) => void;
    addItem: (newItem: CartItem) => void;
    removeItem: (productID: number) => void;
    clearCart: () => void;
};

export const useShoppingCartStore = create<ShoppingCartStore>()(
    persist(
        (set, get) => ({
            items: [],

            setItems: (newItems) => set({ items: newItems }),

            addItem: (newItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.productID === newItem.productID
                );

                if (existingItem) {
                    const updatedItems = currentItems.map((item) =>
                        item.productID === newItem.productID
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                    set({ items: updatedItems });
                } else {
                    set({ items: [...currentItems, newItem] });
                }
            },

            removeItem: (productID) =>
                set((state) => ({
                    items: state.items.filter((item) => item.productID !== productID),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-store",
            getStorage: () => localStorage,
        }
    )
);
