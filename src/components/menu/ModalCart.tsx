"use client";

import React, { useState } from "react";
import ModalLayout from "../HeadlessUI/ModalLayout";
import { useGlobal } from "@/src/store/global/store";
import { ErrorSchema, OrderItemAPIList } from "@/src/Objects";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useOrder } from "@/src/store/order/store";
import { finishOrder, createOrder, updateOrder } from "@/src/api/order";
import DeleteMenu from "@/src/components/menu/Delete";
import { FormatAmount } from "@/src/helpers/format";
import { useMenu } from "@/src/store/menu/store";
import { useParams } from "next/navigation";
import { useMenuSearch } from "@/src/store/searchmenu/index";

const ModalCart = () => {
    const router = useRouter();
    const { categoryName, numMesa } = useParams();
    const order = useMenu((state) => state.order);
    const removeItem = useMenu((state) => state.removeItem);
    const incrementQuantity = useMenu((state) => state.incrementQuantity);
    const decrementQuantity = useMenu((state) => state.decrementQuantity);
    const clearOrder = useMenu((state) => state.clearOrder);
    const setModal = useGlobal((state) => state.setModal);
    const toast = useGlobal((state) => state.toast);
    const setToast = useGlobal((state) => state.setToast);
    const idOrden = useOrder((state) => state.id);
    const setIdOrden = useOrder((state) => state.setId);

    const sucess = useGlobal((state) => state.sucess);
    const navigate = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCloseModal = () => {
        setModal({ status: false, element: null });
    };

    const numeroMesa = parseInt(Array.isArray(numMesa) ? numMesa[0] : numMesa);

    const handleCreateOrder = async () => {
        setIsProcessing(true);
        const parsedOrder = OrderItemAPIList.parse(order);
        const response = await createOrder(parsedOrder, numeroMesa);
        if (response.errors && response.errors.length > 0) {
            setToast({
                status: true,
                type: "error",
                message: "Ocurrio un error (Mesa ocupada)",
            });
            setTimeout(() => {
                setToast({ status: false, type: "error", message: "" });
            }, 1000);
            setIsProcessing(false);
            return;
        }

        setToast({
            status: true,
            type: "success",
            message: "Orden realizada con exito",
        });
        setModal({ status: false, element: null });
        router.push(`/dashboard/ordenes/${response.idOrden}`);

        setTimeout(() => {
            setToast({ status: false, type: "success", message: "" });
        }, 1000);
        clearOrder();
        setIsProcessing(false);
    };

    const handleUpdateOrder = async () => {
        setIsProcessing(true);
        const parsedOrder = OrderItemAPIList.parse(order);
        const response = await updateOrder(idOrden, parsedOrder);
        if (response.errors && response.errors.length > 0) {
            setToast({ status: true, type: "error", message: "Ocurrio un error" });

            setTimeout(() => {
                setToast({ status: false, type: "error", message: "" });
            }, 1000);
            setIsProcessing(false);
            return;
        }

        setToast({
            status: true,
            type: "success",
            message: "Orden actualizada con exito",
        });
        setIdOrden(0);

        setTimeout(() => {
            setModal({ status: false, element: null });
            setToast({ status: false, type: "success", message: "" });
        }, 1000);
        clearOrder();
        setIsProcessing(false);
    };

    return (
        <ModalLayout
            showModal={true}
            toggleModal={handleCloseModal}
            panelClassName="sm:max-w-lg"
            placement="justify-center items-start">
            <div className="duration-300 ease-in-out transition-all  m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800 dark:border-gray-700"></div>
            <div
                className={`flex justify-between items-center py-2.5 px-4 bg-success/90 dark:border-gray-700`}>
                <h3 className="font-medium text-white text-lg">
                    Listado de productos - Crear Orden
                </h3>
                <button
                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                    type="button"
                    onClick={handleCloseModal}>
                    <i className="ri-close-line text-2xl text-white"></i>
                </button>
            </div>
            <div className={`p-4 bg-white text-black font-black overflow-y-auto`}>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Carrito de productos
                </h3>
                <p className="text-sm mb-4">
                    Aquí puedes ver el carrito de productos que has agregado
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                        {" "}
                        Puedes agregar más productos al carrito desde el menú
                    </span>
                </p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 overflow-y-auto">
                {order.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                        <ul>
                            {order.map((item, index) => (
                                <div
                                    className="card mb-2 bg-slate-100 p-2 relative"
                                    key={index}>
                                    <div className="p-2">
                                        <h3 className="card-title pb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-400">
                                            Subtotal:{" "}
                                            <span className="font-bold text-orange-500">
                                                {FormatAmount(item.price)}
                                            </span>{" "}
                                            x {item.quantity}
                                        </p>
                                        <p className="text-gray-400">
                                            Total:{" "}
                                            <span className="font-bold text-orange-500">
                                                {FormatAmount(
                                                    item.price * item.quantity
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between items-center p-2">
                                        <button
                                            className="btn bg-danger text-white"
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    decrementQuantity(item);
                                                } else {
                                                    removeItem(item);
                                                }
                                            }}>
                                            <i className="ri-subtract-line"></i>
                                        </button>
                                        <p className="text-xl">
                                            <span className="font-bold">
                                                {item.quantity}
                                            </span>
                                        </p>
                                        <button
                                            className="btn bg-primary text-white"
                                            onClick={() => incrementQuantity(item)}>
                                            <i className="ri-add-line"></i>
                                        </button>
                                    </div>

                                    <div className="absolute top-2 right-2">
                                        <button
                                            className="btn bg-danger text-white"
                                            onClick={() => removeItem(item)}>
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <p className="text-center font-black text-xl">Total</p>
                        <p className="text-center text-primary font-black text-2xl">
                            {FormatAmount(
                                order.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                )
                            )}
                        </p>

                        <div className="text-center mb-2">
                            <button
                                className="btn bg-white text-black w-full mt-2 border border-gray-300 font-black"
                                onClick={handleCloseModal}>
                                <i className="ri-shopping-cart-2-line me-1"></i>{" "}
                                Continuar agregando
                            </button>
                        </div>
                        <div className="text-center">
                            <button
                                className="btn bg-danger text-white w-full mt-2"
                                onClick={() =>
                                    setModal({
                                        status: true,
                                        element: <DeleteMenu />,
                                    })
                                }>
                                <i className="ri-delete-bin-line me-1"></i> Limpiar
                                Orden
                            </button>
                        </div>
                        <div>
                            {idOrden === 0 ? (
                                <button
                                    className="btn bg-primary text-white w-full mt-4"
                                    onClick={handleCreateOrder}
                                    disabled={isProcessing}>
                                     <i className="ri-check-line me-1"></i>{" "}
                                    {isProcessing
                                        ? "Creando, espere..."
                                        : "Realizar Orden"}
                                </button>
                            ) : (
                                <button
                                    className="btn bg-primary text-white w-full mt-4"
                                    onClick={handleUpdateOrder}
                                        disabled={isProcessing}>
                                    <i className="ri-check-line me-1"></i>{" "}
                                    {isProcessing
                                        ? "Actualizando, espere..."
                                        : "Actualizar Orden"}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                        <p className="text-center font-black text-xl">
                            Carrito Vacio
                        </p>
                        <p className="text-center text-gray-400">
                            No has agregado ningun producto al carrito
                        </p>
                        <p className="text-center text-gray-400">
                            Puedes agregar productos desde el menú
                        </p>
                    </div>
                )}

                {toast.status &&
                    (toast.type === "error" ? (
                        <div className="bg-danger/10 text-danger border border-danger/20 text-sm rounded-md py-3 px-5 my-2">
                            <div className="flex items-center gap-1.5">
                                <i className="ri-close-circle-line text-base"></i>
                                <p className="text-sm">
                                    Error:{" "}
                                    <span className="font-bold">
                                        {toast.message}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-success/10 text-success border border-success/20 text-sm rounded-md py-3 px-5 my-2">
                            <div className="flex items-center gap-1.5">
                                <i className="ri-check-line text-base"></i>
                                <p className="text-sm">
                                    Exito:{" "}
                                    <span className="font-bold">
                                        {toast.message}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </ModalLayout>
    );
};

export default ModalCart;
