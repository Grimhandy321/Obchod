import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";

type ShoppingCartStore = {
    items: CartItem[];
    setItems: (newItems: CartItem[]) => void;
    addItem: (newItem: CartItem) => void;
    removeItem: (productID: number) => void;
    updateQuantity: (productID: number, quantity: number) => void;
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
                    (item) => item?.product?.productID === newItem.product.productID
                );

                if (existingItem) {
                    const updatedItems = currentItems.map((item) =>
                        item?.product?.productID === newItem.product.productID
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
                    items: state.items.filter((item) => item.product.productID !== productID),
                })),

            updateQuantity: (productID, quantity) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.product.productID === productID
                                ? { ...item, quantity }
                                : item
                        )
                        .filter((item) => item.quantity > 0), // auto remove if 0
                })),


            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-store",
            getStorage: () => sessionStorage,
        }
    )
);
