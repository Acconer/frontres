import { getCategories } from "@/src/api/categorias"
import { FormatDate } from "@/src/helpers/format"
import { FormatBadge } from "@/src/helpers/format-element"
import { useCategoria } from "@/src/store/categorias/store"
import { useGlobal } from "@/src/store/global/store"
import { useEffect } from "react"
import FormEditCategoria from "./FormEditCategoria"
import ModalDelete from "./ModalDelete"

const TableCategorias = () => {
    const categoriesData = useCategoria(state => state.categories)
    const setCategories = useCategoria(state => state.setCategories)
    const setModal = useGlobal(state => state.setModal)
    const setId = useCategoria(state => state.setId)
    const setName = useCategoria(state => state.setName)
    const setStatus = useCategoria(state => state.setStatus)
    const pageCategory = useCategoria(state => state.page)
    const setPageCategory = useCategoria(state => state.setPage)
    const searchName = useCategoria(state => state.searchName)
    const setSearchName = useCategoria(state => state.setSearchName)

    useEffect(() => {
        const getCategory = async () => {
            const response = await getCategories(pageCategory)
            setCategories(response)
        } 
        getCategory();
    }, [pageCategory, setCategories])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const getCategory = async () => {
                const response = await getCategories(1, searchName)
                setCategories(response)
            }
            getCategory();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchName, setCategories]);

    console.log(categoriesData)

  return (
    <>
        <div className="flex justify-end gap-2 my-4 lg:w-1/3">
            <input
                type="search"
                placeholder="Buscar categoria"
                className="form-input"
                onChange={(e) => setSearchName(e.target.value)}
            />
        </div>
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
                                                Categoria
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                                Creación
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                                Total de productos
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    {categoriesData.categories.length > 0 ? (<tbody>
                                        {categoriesData.categories.map((category, index) => (
                                            <tr key={category.id}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-white dark:bg-gray-800"
                                                    : "bg-gray-100 dark:bg-gray-900"
                                            } border-b dark:border-gray-700`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 font-bold">
                                                    {category.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
                                                    {FormatBadge(category.active)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
                                                    {FormatDate(category.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
                                                    {category.products.length}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 flex gap-2">
                                                    <button className="btn bg-primary text-white flex-1"
                                                        onClick={() => {
                                                            setModal({ status: true, element: <FormEditCategoria /> })
                                                            setId(category.id)
                                                            setName(category.name)
                                                            setStatus(category.active)
                                                        }}
                                                    >Editar</button>
                                                    <button className="btn bg-danger text-white flex-1"
                                                        onClick={() => {
                                                            setModal({ status: true, element: <ModalDelete /> })
                                                            setId(category.id)
                                                        }}
                                                    >Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    ): (
                                        <tbody>
                                            <tr>
                                                <td colSpan={6} className="text-center py-4">No hay datos</td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

               <div className="flex justify-center gap-2 mt-4">
                 {Array.from({ length: categoriesData.totalPages || 0 }, (_, i) => (
                     <button key={i+1} onClick={() => setPageCategory(i+1)}
                         className={`btn bg-primary text-white ${pageCategory === i+1 ? 'bg-opacity-50' : ''}`}
                     >{i+1}</button>
                 ))}
               </div>
    </>
  )
}

export default TableCategorias
