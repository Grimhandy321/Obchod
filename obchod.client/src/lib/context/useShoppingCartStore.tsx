import { create } from "zustand";
import { CartItem } from "../types";
import { persist } from "zustand/middleware";

type ShoppingCartStore = {
    data: CartItem[];
    setData: (newData: CartItem[]) => void;
};

export const useShoppingCartStore = create<ShoppingCartStore>()(
    persist(
        (set) => ({
            data: [],
            setData: (newData) => set({ data: newData }),
        }),
        {
            name: "cart-Store",
            getStorage: () => localStorage,
        }
    )
);
