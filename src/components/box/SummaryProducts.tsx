'use client'

import { getAllItems } from "@/src/api/order";
import { FormatAmount } from "@/src/helpers/format";
import { useBoxStore } from "@/src/store/box/store"
import { useEffect } from "react";
import {useState} from 'react';

const SummaryProducts = () => {
    const [loading, setLoading] = useState(true);
      const boxPreview = useBoxStore((state) => state.boxPreview);
      const setBoxPreview = useBoxStore((state) => state.setBoxPreview);

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const response = await getAllItems()
            if (response.summary.length > 0) {
                setBoxPreview(response.summary)
            } else {
                setBoxPreview([])
            }
            setLoading(false)
        }
        getData()
     }, [])

  return (
      <>
          {loading ? (
              <div className="flex justify-center items-center h-full w-full">
                  <span className="loader"></span>
              </div>
          ) : (
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Producto
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Cantidad
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Precio c/u
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Total
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          {boxPreview.map((item, index) => (
                              <tr
                                  key={index}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {item.name}
                                  </td>
                                  <td className="px-6 py-4">{item.totalQuantity}</td>
                                  <td className="px-6 py-4">
                                      {FormatAmount(
                                          item.totalPrice / item.totalQuantity
                                      )}
                                  </td>
                                  <td className="px-6 py-4">
                                      {FormatAmount(item.totalPrice)}
                                  </td>
                              </tr>
                          ))}
                          <tr className="bg-indigo-500 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-800 dark:hover:bg-gray-600">
                              <td className="px-6 py-4 text-white whitespace-nowrap dark:text-white font-black">
                                  Total Acumulado
                              </td>
                              <td className="px-6 py-4 font-bold text-white">
                                  {boxPreview.reduce(
                                      (acc, item) => acc + item.totalQuantity,
                                      0
                                  )}
                              </td>
                              <td className="px-6 py-4 font-bold text-white"></td>
                              <td className="px-6 py-4 font-bold text-white">
                                  {FormatAmount(
                                      boxPreview.reduce(
                                          (acc, item) => acc + item.totalPrice,
                                          0
                                      )
                                  )}
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          )}
      </>
  );
}

export default SummaryProducts