import { OrderItemType } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {SearchProductListType} from '@/src/Objects';

export type MenuStore = {
    name: string
    setName: (name: string) => void
    products: SearchProductListType
    setProducts: (products: SearchProductListType) => void
    order: OrderItemType[]
    addItem: (order: OrderItemType) => void
    removeItem: (order: OrderItemType) => void
    clearOrder: () => void
    incrementQuantity: (order: OrderItemType) => void
    decrementQuantity: (order: OrderItemType) => void
    setOrder: (order: OrderItemType[]) => void
}

export const useMenuSearch = create<MenuStore>()(devtools((set) => ({
    name: '',
    setName: (name) => set({ name }),
    products: {} as SearchProductListType,
    setProducts: (products) => set({ products }),
    order: [] as OrderItemType[],
    addItem: (order) => set(state => {
        const exist = state.order.find(item => item.id === order.id);
        if (exist) {
            return { order: state.order.map(item => item.id === order.id ? { ...item, quantity: item.quantity + 1 } : item) }
        } else {
            return { order: [...state.order, { ...order, quantity: 1 }] }
        }
    }),
    removeItem: (order) => set(state => ({ order: state.order.filter(item => item.id !== order.id) })),
    clearOrder: () => set({ order: [] }),
    incrementQuantity: (order) => set(state => ({ order: state.order.map(item => item.id === order.id ? { ...item, quantity: item.quantity + 1 } : item) })),
    decrementQuantity: (order) => set(state => ({ order: state.order.map(item => item.id === order.id ? { ...item, quantity: item.quantity - 1 } : item) })),
    setOrder: (order) => set({ order })
})))