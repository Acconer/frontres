import { OrderItemType } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {SearchProductListType} from '@/src/Objects';

export type MenuStore = {
    tables: any[];
    setTables: (tables: any[]) => void;
    numTable: number;
    setNumTable: (numTable: number) => void;
    capacity: number;
    setCapacity: (capacity: number) => void;
    id: number;
    setId: (id: number) => void;
    imageQr: string;
    setImageQr: (imageQr: string) => void;
}

export const useTables = create<MenuStore>()(devtools((set) => ({
    tables: [],
    setTables: (tables) => set({ tables }),
    numTable: 0,
    setNumTable: (numTable) => set({ numTable }),
    capacity: 0,
    setCapacity: (capacity) => set({ capacity }),
    id: 0,
    setId: (id) => set({ id }),
    imageQr: "",
    setImageQr: (imageQr) => set({ imageQr })
})));