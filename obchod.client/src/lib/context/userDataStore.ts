// src/store/useObjectStore.ts
import { create } from "zustand";

type MyObject = any; // or define specific fields if you prefer


type ObjectStore = {
    data: MyObject;
    setData: (newData: MyObject) => void;
};

export const useObjectStore = create<ObjectStore>((set) => ({
    data: {},
    setData: (newData) => set({ data: newData }),
}));
