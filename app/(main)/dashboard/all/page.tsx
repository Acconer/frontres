/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import PageBreadcrumb from "@/src/components/Global/PageBreadcrumb";
import React from "react";
import { useOrder } from "@/src/store/order/store";
import { useEffect } from "react";
import { getOrders } from "@/src/api/order/index";
import CardOrder from "@/src/components/orders/CardOrder";
import { useGlobal } from "@/src/store/global/store";

const AllOrders = () => {
    const orders = useOrder((state) => state.orders);
    const setOrders = useOrder((state) => state.setOrders);
    const modal = useGlobal((state) => state.modal);

    useEffect(() => {
        const getOrdenes = async () => {
            const response = await getOrders("pending");
            setOrders(response.orders);
        };
        getOrdenes();
    }, []);

    return (
        <>
            <PageBreadcrumb title="Ordenes de compra" subName="Dashboard" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders &&
                    orders.length > 0 &&
                    orders.map((order, index) => (
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
