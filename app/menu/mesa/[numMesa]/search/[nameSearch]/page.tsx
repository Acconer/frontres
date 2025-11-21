/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getCategoryActives } from "@/src/api/categorias";
import { createOrder, updateOrder } from "@/src/api/order";
import { getProductsFindByName } from "@/src/api/product";
import LogoBox from "@/src/components/Global/LogoBox";
import DeleteMenu from "@/src/components/menu/Delete";
import { FormatAmount } from "@/src/helpers/format";
import LogoContainer from "@/src/helpers/logo-container";
import { OrderItemAPIList } from "@/src/Objects";
import { useGlobal } from "@/src/store/global/store";
import { useMenu } from "@/src/store/menu/store";
import { useOrder } from "@/src/store/order/store";
import { useMenuSearch } from "@/src/store/searchmenu";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalCart from "@/src/components/menu/ModalCart";

const MenuSearchPage = () => {
    const router = useRouter();
    const { nameSearch, numMesa } = useParams();
    const categoriesMenu = useMenu((state) => state.categories);
    const setCategoriesMenu = useMenu((state) => state.setCategories);
    const products = useMenuSearch((state) => state.products);
    const setProducts = useMenuSearch((state) => state.setProducts);
    const order = useMenu((state) => state.order);
    const addItem = useMenu((state) => state.addItem);
    const removeItem = useMenu((state) => state.removeItem);
    const incrementQuantity = useMenu((state) => state.incrementQuantity);
    const decrementQuantity = useMenu((state) => state.decrementQuantity);
    const clearOrder = useMenu((state) => state.clearOrder);
    const modal = useGlobal((state) => state.modal);
    const setModal = useGlobal((state) => state.setModal);
    const toast = useGlobal((state) => state.toast);
    const setToast = useGlobal((state) => state.setToast);
    const idOrden = useOrder((state) => state.id);
    const setIdOrden = useOrder((state) => state.setId);

    const name = useMenuSearch((state) => state.name);
    const setName = useMenuSearch((state) => state.setName);

    useEffect(() => {
        const getCategories = async () => {
            const response = await getCategoryActives();
            setCategoriesMenu(response.categories);
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            if (typeof nameSearch === "string") {
                const response = await getProductsFindByName(nameSearch);
                setProducts(response);
            }
        };
        getProducts();
    }, [nameSearch]);

    const numeroMesa = parseInt(Array.isArray(numMesa) ? numMesa[0] : numMesa);

    const [isProcessing, setIsProcessing] = useState(false);

    const handleCreateOrder = async () => {
        setIsProcessing(true);
        const parsedOrder = OrderItemAPIList.parse(order);
        const response = await createOrder(parsedOrder, numeroMesa);
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
            message: "Orden realizada con exito",
        });
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
            setToast({ status: false, type: "success", message: "" });
        }, 1000);
        clearOrder();
        setIsProcessing(false);
    };

    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = () => {
        const mainElement = document.querySelector("main");
        if (mainElement) {
            const isBottom =
                mainElement.scrollHeight - mainElement.scrollTop <=
                mainElement.clientHeight + 10;
            setIsAtBottom(isBottom);
        }
    };

    useEffect(() => {
        const mainElement = document.querySelector("main");
        if (mainElement) {
            mainElement.addEventListener("scroll", handleScroll);
            return () => mainElement.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const toggleScroll = () => {
        const mainElement = document.querySelector("main");
        if (mainElement) {
            mainElement.scrollTo({
                top: isAtBottom ? 0 : mainElement.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const searchProducts = async () => {
        if (name.trim() === "") {
            return;
        }
        router.push(`/menu/mesa/${numMesa}/search/${name}`);
        setName("");
    };

    return (
        <main className="grid grid-cols-1 lg:grid-cols-[1fr,2fr,1fr] gap-4 mx-auto bg-gray-100 p-3 dark:bg-gray-800 rounded relative overflow-y-auto min-h-screen h-[calc(100vh-20px)] overflow-hidden">
            {/* Menu Categorias */}
            <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100vh-200px)] md:h-[calc(100vh-90px)] bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <div className="grid grid-cols-1 gap-4 grid-rows-[auto, auto, auto, 1fr] overflow-y-auto">
                    <div className="flex justify-center items-center bg-gray-200/20 dark:bg-gray-800 lg:p-4 p-2 rounded-md h-20">
                        <LogoContainer />
                    </div>
                    <div className="flex justify-center items-center bg-gray-200/20 dark:bg-gray-800 lg:p-4 p-2 rounded-md">
                        <input
                            type="search"
                            placeholder="Buscar"
                            className="p-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 w-full"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    searchProducts();
                                }
                            }}
                        />
                        <button
                            className="btn bg-primary text-white ms-2"
                            onClick={searchProducts}>
                            <i className="ri-search-line"></i> Buscar
                        </button>
                    </div>
                    <div className="flex justify-center items-center bg-gray-200/20 dark:bg-gray-800 lg:p-4 p-2 rounded-md">
                        <Link
                            href="/dashboard/ordenes"
                            className="btn bg-primary text-white w-full uppercase font-bold"
                            onClick={() => router.refresh()}>
                            Listado de Ordenes
                        </Link>
                    </div>
                    <h1 className="text-2xl font-black uppercase text-indigo-600 text-center">
                        Categorias
                    </h1>
                    <div className="grid grid-cols-1 gap-4 grid-rows-[auto,auto,auto,1fr] overflow-y-auto">
                        <div className="grid grid-cols-1 gap-4 overflow-y-visible">
                            {categoriesMenu.map((category, index) => (
                                <Link
                                    key={index}
                                    href={`/menu/mesa/${numMesa}/category/${category.name.toLowerCase()}`}
                                    className={`border border-indigo-600 gap-4 px-1 py-2 rounded-md`}>
                                    <div className="flex justify-center items-center gap-1">
                                        {/* Contenedor con tamaño fijo para la imagen */}
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                            <Image
                                                src={`/logos/icon_${
                                                    category.name
                                                        .toLowerCase()
                                                        .split(" ")[0]
                                                }.svg`}
                                                alt={category.name}
                                                width={50}
                                                height={50}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/logos/icon_noencontrado.svg";
                                                    e.currentTarget.onerror = null;
                                                }}
                                            />
                                        </div>
                                        <p
                                            className={`text-center font-black text-xl text-black flex-grow`}>
                                            {category.name}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Productos */}
            <div className="overflow-y-auto h-[calc(100vh-120px)] mt-10">
                <h1 className="text-left text-xl font-black mb-10 uppercase text-amber-600">
                    Productos encontrados de: {nameSearch}
                </h1>
                {(products ?? []).length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        {products?.map((product, index) => (
                            <button
                                key={index}
                                className="bg-white dark:bg-gray-900 p-4 rounded-md hover:bg-amber-200 dark:hover:bg-gray-700 flex items-center gap-2 flex-col"
                                onClick={() =>
                                    addItem({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        quantity: 1,
                                        categoryId: product.categoryId,
                                        createdAt: product.createdAt,
                                        updatedAt: product.updatedAt,
                                        status: product.status,
                                    })
                                }>
                                <Image
                                    src={"/images/comida.webp"}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="rounded w-14"
                                />
                                <div>
                                    <p className="text-center font-black text-xl uppercase text-zinc-950">
                                        {product.name}
                                    </p>
                                    <p className="text-center text-2xl text-primary font-black">
                                        {FormatAmount(product.price)}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-2xl font-black">No hay productos</p>
                    </div>
                )}
            </div>
            {/* Menu Carrito / Total */}
            <div className="overflow-y-auto h-[calc(100vh-120px)]">
                {order.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                        <p className="text-center font-black text-xl">Carrito</p>
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
                                    <i className="ri-check-line me-1"></i>{" "}
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

                        {modal.status && modal.element}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-2xl font-black">
                            Comienza a agregar productos a la orden
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

            <button
                className="btn bg-primary text-white fixed bottom-4 right-4 lg:hidden"
                onClick={toggleScroll}>
                <i
                    className={
                        isAtBottom ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                    }></i>
            </button>

            <button
                className="btn bg-amber-600 text-white fixed bottom-4 left-4 lg:hidden py-2"
                onClick={() => setModal({ status: true, element: <ModalCart /> })}>
                <i className="ri-shopping-cart-2-line w-full text-xl"></i>
            </button>

            {modal.status && modal.element}
        </main>
    );
};

export default MenuSearchPage;
