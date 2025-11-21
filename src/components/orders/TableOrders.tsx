/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { getOrders } from "@/src/api/order";
import { FormatAmount, FormatDateTime } from "@/src/helpers/format";
import { FormatStatePlatillo } from "@/src/helpers/format-element";
import { useOrder } from "@/src/store/order/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TableOrders = () => {
    const navigation = useRouter();
    const orders = useOrder(state => state.orders)
    const setOrders = useOrder(state => state.setOrders)

    useEffect(() => {
        const getOrdenes = async () => {
            const response = await getOrders('pending')
            setOrders(response.orders)
        }
        getOrdenes()
    }, [])

    return (
        <>
            <div className="flex flex-col mt-10">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full border border-gray-300 dark:border-gray-700">
                                <thead className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Identificador
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Mesero
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Total
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Estado
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            N. de Platillos
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Fecha de realización
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Numero de mesa
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Visualización
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders &&
                                        orders.length > 0 &&
                                        orders.map((order, index) => (
                                            <tr
                                                key={order.id}
                                                className={`${
                                                    index % 2 === 0
                                                        ? "bg-white dark:bg-gray-800"
                                                        : "bg-gray-100 dark:bg-gray-900"
                                                } border-b dark:border-gray-700`}>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700 font-bold">
                                                    {order.id}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {order.mesero}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {FormatAmount(order.total)}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {FormatStatePlatillo(
                                                        order.status
                                                    )}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {order.products.length}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {FormatDateTime(order.date)}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {order.numTable}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700 grid grid-cols-1 gap-2">
                                                    <button
                                                        className="bg-primary text-white px-2 py-2 rounded-md w-full font-bold"
                                                        onClick={() =>
                                                            navigation.push(
                                                                `/dashboard/ordenes/${order.id}`
                                                            )
                                                        }>
                                                        Ver
                                                    </button>
                                                    <button
                                                        className="bg-green-500 text-white px-2 py-2 rounded-md w-full mt-2 font-bold"
                                                        onClick={() =>
                                                            navigation.push(
                                                                `/ticket/${order.id}`
                                                            )
                                                        }>
                                                        Imprimir
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TableOrders
