/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import PageBreadcrumb from "@/src/components/Global/PageBreadcrumb";
import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useOrder } from "@/src/store/order/store";
import { getOrders } from "@/src/api/order/index";
import CardOrder from "@/src/components/orders/CardOrder";
import { useGlobal } from "@/src/store/global/store";

let socket: Socket | null = null; // una sola instancia

const AllOrders = () => {
    const orders = useOrder((state) => state.orders);
    const setOrders = useOrder((state) => state.setOrders);
    const modal = useGlobal((state) => state.modal);

    useEffect(() => {
        const cargarOrdenesIniciales = async () => {
            const response = await getOrders("pending");
            setOrders(response.orders);
        };

        cargarOrdenesIniciales();

        if (!socket) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
            const socketUrl = apiUrl.replace(/\/api\/?$/, "");
            socket = io(socketUrl, { transports: ["websocket"] });
        }

        console.log("🔌 Escuchando socket: order:created, order:updated, order:finished");

        const handleNewOrder = (newOrder: any) => {
            console.log("📩 Nueva orden vía socket:", newOrder);
            setOrders((prev: any[]) => [newOrder, ...prev]);
        };

        const handleOrderUpdated = (updatedOrder: any) => {
            console.log("♻️ Orden actualizada vía socket:", updatedOrder);
            setOrders((prev: any[]) =>
                prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
            );
        };

        // ⬇️⬇️ NUEVO: FINALIZAR ORDEN
        const handleOrderFinished = (finishedOrder: any) => {
            console.log("🏁 Orden finalizada vía socket:", finishedOrder);
            setOrders((prev: any[]) =>
                prev.map((o) => (o.id === finishedOrder.id ? finishedOrder : o))
            );
        };
        // ⬆️⬆️ NUEVO

        socket.on("order:created", handleNewOrder);
        socket.on("order:updated", handleOrderUpdated);
        socket.on("order:finished", handleOrderFinished);

        return () => {
            if (socket) {
                socket.off("order:created", handleNewOrder);
                socket.off("order:updated", handleOrderUpdated);
                socket.off("order:finished", handleOrderFinished);
            }
        };
    }, [setOrders]);



    return (
        <>
            <PageBreadcrumb title="Ordenes de compra" subName="Dashboard" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders &&
                    orders.length > 0 &&
                    orders.map((order) => (
                        <CardOrder key={order.id} product={order} />
                    ))}
            </div>

            {orders && orders.length === 0 && (
                <div className="flex items-center justify-center w-full h-full p-4 text-2xl font-bold text-gray-500">
                    No hay ordenes de compra
                </div>
            )}

            {modal.status && modal.element}
        </>
    );
};

export default AllOrders;
