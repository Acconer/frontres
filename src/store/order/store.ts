import { OrderItemIndividualType, OrderItemMenuType } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type OrderStore = {
    orders: OrderItemMenuType;
    setOrders: (
        orders:
            | OrderItemMenuType
            | ((prev: OrderItemMenuType) => OrderItemMenuType)
    ) => void;

    order: OrderItemIndividualType;
    setOrder: (order: OrderItemIndividualType) => void;

    id: number;
    setId: (id: number) => void;

    payment: string;
    setPayment: (payment: string) => void;

    page: number;
    setPage: (page: number) => void;
};

export const useOrder = create<OrderStore>()(
    devtools((set) => ({
        orders: {
            orders: [],
            totalPages: 0,
        },

        setOrders: (orders) =>
            set((state) =>
                typeof orders === "function"
                    ? { orders: orders(state.orders) }
                    : { orders }
            ),

        order: {} as OrderItemIndividualType,
        setOrder: (order) => set({ order }),

        id: 0,
        setId: (id) => set({ id }),

        payment: "",
        setPayment: (payment) => set({ payment }),

        page: 1,
        setPage: (page) => set({ page }),
    }))
);
