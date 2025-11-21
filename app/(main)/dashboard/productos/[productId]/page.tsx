/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getProductById } from "@/src/api/product";
import FormEditProduct from "@/src/components/product/FormEditProduct";
import ModalDelete from "@/src/components/product/ModalDelete";
import { FormatAmount } from "@/src/helpers/format";
import { useGlobal } from "@/src/store/global/store";
import { useProduct } from "@/src/store/product/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const ProductVisualizer = () => {
    const navigate = useRouter();
    const { productId } = useParams();
    const product = useProduct((state) => state.product);
    const setProduct = useProduct((state) => state.setProduct);
    const setStatus = useProduct((state) => state.setStatus);
    const [loading, setLoading] = useState(true);
    const modal = useGlobal((state) => state.modal);
    const setModal = useGlobal((state) => state.setModal);
    const setId = useProduct((state) => state.setId);
    const setName = useProduct((state) => state.setName);
    const setPrice = useProduct((state) => state.setPrice);
    const setCategoryId = useProduct((state) => state.setCategoryId);
    const setIngredients = useProduct((state) => state.setIngredients);

    useEffect(() => {
        const getProduct = async () => {
            const response = await getProductById(+productId!);
            if (response.errors && response.errors.length > 0) {
                navigate.push("/dashboard/productos");
            } else {
                setProduct(response.product);
                setStatus(response.product.status);
            }
            setLoading(false);
        };
        getProduct();
    }, [productId]);

    // 👇 Construimos la URL final de la imagen
    const imageSrc = useMemo(() => {
        if (!product?.imageUrl) return null;

        const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
        const backendBase = apiBase.replace(/\/api\/?$/, ""); // http://localhost:4000

        if (product.imageUrl.startsWith("http")) {
            return product.imageUrl;
        }

        return `${backendBase}${product.imageUrl}`;
    }, [product?.imageUrl]);

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

            <section className="mt-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md p-4 w-full lg:w-1/2 mx-auto">
                <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 uppercase text-center">
                    {product.name}
                </h2>

                {/* 👇 Nueva sección para la imagen del producto */}
                {imageSrc && (
                    <div className="flex justify-center mt-4">
                        <div className="w-40 h-40 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                            {/* Puedes cambiar a next/image si quieres */}
                            <img
                                src={imageSrc}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center gap-4 mt-4">
                    <div>
                        <p className="text-gray-800 dark:text-gray-100 font-semibold">
                            Precio:{" "}
                            <span className="text-blue-500 dark:text-blue-300">
                                {FormatAmount(product.price)}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-800 dark:text-gray-100 font-semibold">
                            Categoria:{" "}
                            <span className="text-blue-500 dark:text-blue-300">
                                {product.category.name}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-gray-800 dark:text-gray-100 font-semibold text-center uppercase my-4">
                            Descripción del producto
                        </p>
                        {product.ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-2">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Ingrediente {index + 1}:{" "}
                                    <span className="text-blue-500 dark:text-blue-300">
                                        {ingredient.name}
                                    </span>
                                </h3>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                    Cantidad necesaria:{" "}
                                    <span className="text-blue-500 dark:text-blue-300">
                                        {ingredient.ProductIngredient.quantity}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-gray-800 dark:text-gray-100 font-semibold text-center uppercase my-4">
                            Descripción General
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Precio:{" "}
                                <span className="text-blue-500 dark:text-blue-300">
                                    {FormatAmount(product.price)}
                                </span>
                            </h3>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                Estatús:{" "}
                                <span
                                    className={
                                        product.status
                                            ? "text-green-500 dark:text-green-300"
                                            : "text-red-500 dark:text-red-300"
                                    }>
                                    {product.status ? "Activo" : "Inactivo"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col lg:flex-row gap-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase w-full flex justify-center items-center lg:w-auto gap-3 mt-4 flex-1"
                        onClick={() => {
                            setModal({ status: true, element: <FormEditProduct /> });
                            setId(product.id);
                            setName(product.name);
                            setPrice(product.price);
                            setCategoryId(product.category.id);
                            setIngredients(
                                product.ingredients.map((ingredient) => ({ id: ingredient.id }))
                            );
                            setStatus(product.status);
                        }}>
                        <i className="ri-pencil-line"></i> Editar
                    </button>
                    <button
                        className={`${
                            product.status
                                ? "bg-red-500 hover:bg-red-700"
                                : "bg-green-500 hover:bg-green-700"
                        } 
                            text-white font-bold py-2 px-4 rounded uppercase w-full flex justify-center items-center lg:w-auto gap-3 mt-4 flex-1
                        `}
                        onClick={() => {
                            setModal({ status: true, element: <ModalDelete /> });
                            setId(product.id);
                        }}>
                        <i className="ri-delete-bin-line"></i> Eliminar
                    </button>
                </div>
            </section>

            {modal.status && modal.element}
        </>
    );
};

export default ProductVisualizer;
