/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getBoxById } from "@/src/api/box";
import { FormatAmount, FormatDateTime } from "@/src/helpers/format";
import { useBoxStore } from "@/src/store/box/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderItem = () => {
    const navigate = useRouter();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const boxItem = useBoxStore((state) => state.boxItem);
    const setBoxItem = useBoxStore((state) => state.setBoxItem);

    useEffect(() => {
        const getProduct = async () => {
            const response = await getBoxById(+id!);
            if (response.errors && response.errors.length > 0) {
                navigate.push("/dashboard/caja");
            } else {
                setBoxItem(response.box);
            }
            setLoading(false);
        };
        getProduct();
    }, [id]);

    if (loading) return <>Cargando...</>;

    console.log(boxItem);
   
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
                className={`card border border-green-500 mt-10 w-full md:w-2/3 lg:w-1/2 mx-auto relative rounded-lg`}>
                <div className="p-6">
                    <h3 className="text-base font-bold text-secondary dark:text-white mb-2 uppercase text-left md:text-center">
                        Cierre de caja #{boxItem.id}
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3">
                        Fecha del pedido:{" "}
                        <span className="font-black">
                            {FormatDateTime(boxItem.createdAt)}
                        </span>
                    </p>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3">
                        Mesero a cargo:{" "}
                        <span className="font-black">{boxItem.name}</span>
                    </p>
                    
                    <div className="card my-5">
                        <div className="flex flex-col">
                            {boxItem.related_products.length > 0 ? (
                                boxItem.related_products.map((item) => (
                                    <div
                                        className="inline-flex items-center justify-between gap-x-2 py-3 px-5 bg-white border text-gray-800 dark:bg-gray-800 dark:text-gray-200 -mt-px first:rounded-t-md last:rounded-b-md dark:border-gray-600 text-xl font-bold"
                                        key={item.id}>
                                        {item.BoxProduct.quantity} x{" "}
                                        {item.name}
                                        <span className="inline-flex items-center gap-1.5 px-1 rounded-full text-xs font-normal bg-primary text-white">
                                            Precio:{" "}
                                            {FormatAmount(item.BoxProduct.total)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-800 dark:text-gray-400">
                                        No hay productos en el cierra de caja
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="mt-1 text-gray-800 dark:text-gray-400 mb-3 text-right text-lg">
                        Total del Día:{" "}
                        <span className="font-black text-primary">
                            {FormatAmount(boxItem.total)}
                        </span>
                    </p>
                    <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                        <Link className={`btn bg-primary text-white mt-2 w-full`} href={`/boxticket/${boxItem.id}`}>
                            Imprimir Ticket
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default OrderItem;
