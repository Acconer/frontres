/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { FormatDateTime } from "@/src/helpers/format"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllBoxes } from "@/src/api/box"
import { useBoxStore } from "@/src/store/box/store"

const TableBox = () => {
    const navigation = useRouter()
    const box = useBoxStore(state => state.box)
    const setBox = useBoxStore(state => state.setBox)
    const page = useBoxStore(state => state.page)
    const setPage = useBoxStore(state => state.setPage)
    
    useEffect(() => {
        const getBoxes = async () => {
            const response = await getAllBoxes(page)
            setBox(response)
        }
        getBoxes()
    }, [page])

  return (
    <>
            <div className="flex flex-col">
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
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Fecha de creación
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Total de productos
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Visualización
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {box.boxes.length > 0 && box.boxes.map((item, index) => (
                                        <tr key={item.id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white dark:bg-gray-800"
                                                : "bg-gray-100 dark:bg-gray-900"
                                        } border-b dark:border-gray-700`}>
                                            <td
                                                className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700 font-bold">
                                                {item.id}
                                            </td>
                                            <td
                                                className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                {item.name}
                                            </td>
                                            <td
                                                className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                {FormatDateTime(item.createdAt)}
                                            </td>
                                            <td
                                                className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                {item.related_products.length}
                                            </td>
                                            <td
                                                className="text-sm text-gray-900 dark:text-gray-100 px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                <button
                                                    className="bg-primary text-white px-2 py-1 rounded-md w-full"
                                                    onClick={() => navigation.push(`/dashboard/caja/${item.id}`)}>
                                                    Ver
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

            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: box.pages || 0 }, (_, i) => (
                    <button key={i+1} onClick={() => setPage(i+1)}
                        className={`btn bg-primary text-white ${page === i+1 ? 'bg-opacity-50' : ''}`}
                    >{i+1}</button>
                ))}
            </div>
    </>
  )
}

export default TableBox
