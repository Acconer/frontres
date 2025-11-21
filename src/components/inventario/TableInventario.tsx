"use client";

import { useEffect } from "react";
import { FormatDate } from "@/src/helpers/format";
import { useGlobal } from "@/src/store/global/store";
import { getAllIngredients } from "@/src/api/inventarios";
import { useInventario } from "@/src/store/inventario/store";
import { FormatBadge } from "@/src/helpers/format-element";
import FormEditIngredient from "./FormEditIngredient";

const TableInventario = () => {
    const setModal = useGlobal(state => state.setModal);
    const ingredientsData = useInventario(state => state.inventario);
    const setIngredients = useInventario(state => state.setInventario);
    const setId = useInventario(state => state.setId);
    const setNombre = useInventario(state => state.setNombre);
    const setQuantity = useInventario(state => state.setQuantity);
    const setStatus = useInventario(state => state.setStatus);
    const page = useInventario(state => state.page);
    const setPage = useInventario(state => state.setPage);
    const name = useInventario(state => state.namesearch);
    const setName = useInventario(state => state.setNameSearch);

    useEffect(() => {
        const get = async () => {
            const response = await getAllIngredients(page);
            setIngredients(response);
        };
        get();
    }, [page, setIngredients]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            const get = async () => {
                const response = await getAllIngredients(1, name);
                setIngredients(response);
            };
            get();
        }, 500);

        return () => clearTimeout(debounceSearch);
    }, [name, setIngredients]);

    return (
        <>
            <div className="flex justify-end gap-2 my-4 lg:w-1/3 px-6 lg:px-8">
                <input
                    type="search"
                    placeholder="Buscar ingrediente"
                    className="form-input"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Cantidad
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Estado
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Creación
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Actualización
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm text-gray-900 px-6 py-4 text-left border border-gray-300 font-black uppercase dark:text-white dark:border-gray-700">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {ingredientsData.ingredients.length > 0 ? (
                                    <tbody> {
                                        ingredientsData.ingredients.map((ingredient, index) => (
                                            <tr key={ingredient.id}
                                                className={`${index % 2 === 0
                                                        ? "bg-white dark:bg-gray-800"
                                                        : "bg-gray-100 dark:bg-gray-900"
                                                    } border-b dark:border-gray-700`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 font-bold dark:text-white dark:border-gray-700">
                                                    {ingredient.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    {ingredient.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 flex dark:text-white dark:border-gray-700">
                                                    {
                                                        ingredient.quantity < 10 ? (
                                                            <span className="bg-red-500 text-white font-bold py-2 px-4 rounded uppercase flex-1 text-center">
                                                                {ingredient.quantity}
                                                            </span>
                                                        ) : (
                                                            <span className="bg-green-500 text-white font-bold py-2 px-4 rounded uppercase flex-1 text-center">
                                                                {ingredient.quantity}
                                                            </span>
                                                        )
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    {FormatBadge(ingredient.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    {FormatDate(ingredient.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    {FormatDate(ingredient.updatedAt)}
                                                </td>
                                                <td className="flex px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase flex-1"
                                                        onClick={() => {
                                                            setModal({ status: true, element: <FormEditIngredient /> })
                                                            setId(ingredient.id)
                                                            setNombre(ingredient.name)
                                                            setQuantity(ingredient.quantity)
                                                            setStatus(ingredient.status)
                                                        }}>
                                                        Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={7} className="text-center py-4 text-sm text-gray-900 border border-gray-300 dark:text-white dark:border-gray-700">
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
                {page > 1 && (
                    <>
                        <button onClick={() => setPage(1)} className="btn bg-primary text-white">1</button>
                        {page > 3 && <span className="text-blue-500">...</span>}
                    </>
                )}

                {Array.from({ length: ingredientsData.totalPages || 0 }, (_, i) => i + 1)
                    .filter(p => p === page || (p >= page - 1 && p <= page + 1) || p > ingredientsData.totalPages - 2)
                    .map(p => (
                        <button key={p} onClick={() => setPage(p)}
                            className={`btn bg-primary text-white ${page === p ? 'bg-opacity-50' : ''}`}
                        >{p}</button>
                    ))}

                {page < ingredientsData.totalPages - 1 && (
                    <>
                        {page < ingredientsData.totalPages - 2 && <span className="text-blue-500">...</span>}
                        <button onClick={() => setPage(ingredientsData.totalPages)} className="btn bg-primary text-white">
                            {ingredientsData.totalPages}
                        </button>
                    </>
                )}
            </div>

        </>
    );
};

export default TableInventario;
