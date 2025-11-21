/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getOrderById } from "@/src/api/order";
import ModalReturnOrder from "@/src/components/ventas/ModalReturnOrder";
import { FormatAmount, FormatDateTime } from "@/src/helpers/format";
import { FormatStatePlatillo } from "@/src/helpers/format-element";
import { useGlobal } from "@/src/store/global/store";
import { useOrder } from "@/src/store/order/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const OrderItemVenta = () => {
    const navigate = useRouter();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const order = useOrder((state) => state.order);
    const setOrder = useOrder((state) => state.setOrder);
    const modal = useGlobal((state) => state.modal);
    const setModal = useGlobal((state) => state.setModal);
    const setId = useOrder((state) => state.setId);

    useEffect(() => {
        const getProduct = async () => {
            const response = await getOrderById(+id!);
            if (response.errors && response.errors.length > 0) {
                navigate.push("/dashboard/productos");
            } else {
                setOrder(response.order);
            }
            setLoading(false);
        };
        getProduct();
    }, [id]);

    if (loading) return <>Cargando...</>;

    return (
        <>
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase w-full flex justify-center items-center lg:w-auto gap-3"
                    onClick={() => navigate.back()}>
                    <i className="ri-eye-line"></i> Regresar
                </button>
            </div>

            <div
                className={`card border 
            ${
                order.methodPayment === null
                    ? "border-yellow-950"
                    : order.methodPayment === "efectivo"
                    ? "border-green-500"
                    : "border-blue-500"
            }
        mt-10 w-full md:w-2/3 lg:w-1/2 mx-auto relative rounded-lg`}>
                <div className="p-6">
                    <h3 className="text-base font-bold text-secondary dark:text-white mb-2 uppercase text-left md:text-center">
                        Orden #{order.id}
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3">
                        Fecha del pedido:{" "}
                        <span className="font-black">
                            {FormatDateTime(order.date)}
                        </span>
                    </p>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3">
                        Mesero a cargo:{" "}
                        <span className="font-black">{order.mesero}</span>
                    </p>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3">
                        Mesa:{" "}
                        <span className="font-black">{order.numTable}</span>
                    </p>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3 flex items-center gap-2">
                        Estado del pedido:{" "}
                        <span className="font-black">
                            {FormatStatePlatillo(order.status)}
                        </span>
                    </p>
                    <div className="card my-5">
                        <div className="flex flex-col">
                            {order.products.length > 0 ? (
                                order.products.map((product) => (
                                    <div
                                        className="inline-flex items-center justify-between gap-x-2 py-3 px-5 bg-white border text-gray-800 dark:bg-gray-800 dark:text-gray-200 -mt-px first:rounded-t-md last:rounded-b-md dark:border-gray-600 text-xl font-bold"
                                        key={product.id}>
                                        {product.OrderProduct.quantity} x{" "}
                                        {product.name}
                                        <span className="inline-flex items-center gap-1.5 px-1 rounded-full text-xs font-normal bg-primary text-white">
                                            Precio:{" "}
                                            {FormatAmount(
                                                product.price *
                                                    product.OrderProduct.quantity
                                            )}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-800 dark:text-gray-400">
                                        No se han agregado productos a la orden
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3 text-right text-lg">
                        Total a pagar:{" "}
                        <span className="font-black text-primary">
                            {FormatAmount(order.total)}
                        </span>
                    </p>
                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                        <button className={`btn bg-success text-white mt-2 w-full`} type="button"
                            onClick={() => {
                                setModal({ status: true, element: <ModalReturnOrder /> });
                                setId(order.id);
                            }}
                        >
                            Regresar a la cocina
                        </button>
                        <Link className={`btn bg-primary text-white mt-2 w-full`} href={`/ticket/${order.id}`}>
                            Imprimir Ticket
                        </Link>
                    </div>
                </div>

                <div className="absolute top-0 right-0 bg-primary text-white p-2 rounded-bl-lg rounded-tr-lg">
                    {order.methodPayment === null && (
                        <span className="text-sm">Pendiente</span>
                    )}
                </div>
                <div
                    className={`absolute top-0 right-0 p-2 rounded-bl-lg rounded-tr-lg ${
                        order.methodPayment === null
                            ? "bg-yellow-950"
                            : order.methodPayment === "efectivo"
                            ? "bg-green-500"
                            : order.methodPayment === "tarjeta"
                            ? "bg-blue-500"
                            : "bg-red-500"
                    } text-white`}>
                    <span className="text-sm">
                        {order.methodPayment === null
                            ? "Pago: Pendiente"
                            : order.methodPayment === "efectivo"
                            ? "Pago: Efectivo"
                            : order.methodPayment === "tarjeta"
                            ? "Pago: Tarjeta"
                            : "En espera"}
                    </span>
                </div>
            </div>

            {
                modal.status && modal.element
            }
        </>
    );
};

export default OrderItemVenta;
