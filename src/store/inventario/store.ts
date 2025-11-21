import { InventarioList } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type InventarioStore = {
    id: number
    nombre: string
    quantity: number
    status: boolean
    inventario: InventarioList
    page: number
    namesearch: string
    setInventario: (inventario: InventarioList) => void
    setId: (id: number) => void
    setNombre: (nombre: string) => void
    setQuantity: (quantity: number) => void
    setStatus: (status: boolean) => void
    setPage: (page: number) => void
    setNameSearch: (namesearch: string) => void
}

export const useInventario = create<InventarioStore>()(devtools(set => ({
    id: 0,
    nombre: '',
    quantity: 0,
    inventario: { ingredients: [], totalPages: 0 } as InventarioList,
    status: true,
    page: 1,
    namesearch: '',
    setInventario: (inventario: InventarioList) => set({ inventario }),
    setId: (id: number) => set({ id }),
    setNombre: (nombre: string) => set({ nombre }),
    setQuantity: (quantity: number) => set({ quantity }),
    setStatus: (status: boolean) => set({ status }),
    setPage: (page: number) => set({ page }),
    setNameSearch: (namesearch: string) => set({ namesearch })
})))