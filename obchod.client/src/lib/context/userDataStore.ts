import { create } from "zustand";
import { persist } from "zustand/middleware";

type MyObject = any;

type ObjectStore = {
    data: MyObject;
    setData: (newData: MyObject) => void;
};

export const useObjectStore = create<ObjectStore>()(
    persist(
        (set) => ({
            data: {},
            setData: (newData) => set({ data: newData }),
        }),
        {
            name: "userData-store", // localStorage key
            getStorage: () => localStorage, // optional (default is localStorage)
        }
    )
);
