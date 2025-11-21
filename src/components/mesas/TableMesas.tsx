"use client";

import { useEffect } from "react";
import { FormatDate } from "@/src/helpers/format";
import { useGlobal } from "@/src/store/global/store";
import { getAllIngredients } from "@/src/api/inventarios";
import { useInventario } from "@/src/store/inventario/store";
import { FormatBadge, FormatStateMesa } from "@/src/helpers/format-element";
import { getOrders } from "@/src/api/order";
import { useTables } from "@/src/store/tables";
import { getTables } from "@/src/api/table";
import FormEditMesas from "./FormEditMesas";
import ModalQR from "./ModalQR";
import ModalDeleteTable from "./ModalDelete";

const TableMesas = () => {
    const setModal = useGlobal(state => state.setModal);
    const tables = useTables(state => state.tables);
    const setTables = useTables(state => state.setTables);
    const setId = useTables(state => state.setId);
    const setNumTable = useTables(state => state.setNumTable);
    const setCapacity = useTables(state => state.setCapacity);

    useEffect(() => {
        const get = async () => {
            const response = await getTables();
            setTables(response);
        };
        get();
    }, []);

    return (
        <>
            <div className="flex justify-end gap-2 my-4 lg:w-1/3 px-6 lg:px-8"></div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full border border-gray-300 dark:border-gray-700">
                                <thead className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Identificador
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Numero Mesa
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Estado
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Capacidad
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Codigo QR
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {tables.length > 0 ? (
                                    tables.map((table, index) => (
                                        <tbody>
                                            <tr
                                                key={table.id}
                                                className={`${
                                                    index % 2 === 0
                                                        ? "bg-white dark:bg-gray-800"
                                                        : "bg-gray-100 dark:bg-gray-900"
                                                } border-b dark:border-gray-700`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 font-bold dark:text-white dark:border-gray-700">
                                                    {table.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    {table.numTable}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 flex dark:text-white dark:border-gray-700">
                                                    {FormatStateMesa(table.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    {table.capacity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    <button
                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded uppercase flex-1 w-full"
                                                        onClick={() => {
                                                            setModal({
                                                                status: true,
                                                                element: (
                                                                    <ModalQR />
                                                                ),
                                                            });
                                                            setId(table.id);
                                                        }}>
                                                        Generar QR
                                                    </button>
                                                </td>
                                                <td className="flex px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700 gap-5">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase flex-1"
                                                        onClick={() => {
                                                            setModal({
                                                                status: true,
                                                                element: (
                                                                    <FormEditMesas />
                                                                ),
                                                            });
                                                            setNumTable(
                                                                table.numTable
                                                            );
                                                            setCapacity(
                                                                table.capacity
                                                            );
                                                            setId(table.id);
                                                        }}>
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded uppercase flex-1"
                                                        onClick={() => {
                                                            setModal({
                                                                status: true,
                                                                element: (
                                                                    <ModalDeleteTable />
                                                                ),
                                                            });
                                                            setId(table.id);
                                                        }}>
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center py-4 text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                No hay datos
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {/* {Array.from({ length: ingredientsData.totalPages || 0 }, (_, i) => (
                    <button key={i+1} onClick={() => setPage(i+1)}
                        className={`btn bg-primary text-white ${page === i+1 ? 'bg-opacity-50' : ''}`}
                    >{i+1}</button>
                ))} */}
            </div>
        </>
    );
};

export default TableMesas;
