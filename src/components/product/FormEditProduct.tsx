/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Select from 'react-select';
import ModalLayout from '../HeadlessUI/ModalLayout';
import FormInput from '../FormInput';
import { useGlobal } from '@/src/store/global/store';
import {
    ErrorSchema,
    parseCategoryToOptions,
    parseInventoryToOptions,
} from '@/src/Objects';
import { useEffect, useState, useMemo } from 'react';
import { getAllCategories } from '@/src/api/categorias';
import { useOptions } from '@/src/store/options/store';
import { useProduct } from '@/src/store/product/store';
import { getIngredientsAll } from '@/src/api/inventarios';
import { updateProduct } from '@/src/api/product';
import { useRouter } from 'next/navigation';

const FormEditProduct = () => {
    const navigate = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [fileImage, setFileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Store de producto
    const product = useProduct((state) => state.product);
    const id = useProduct((state) => state.id);
    const setId = useProduct((state) => state.setId);
    const name = useProduct((state) => state.name);
    const setName = useProduct((state) => state.setName);
    const price = useProduct((state) => state.price);
    const setPrice = useProduct((state) => state.setPrice);
    const categoryId = useProduct((state) => state.categoryId);
    const setCategoryId = useProduct((state) => state.setCategoryId);
    const ingredients = useProduct((state) => state.ingredients);
    const setIngredients = useProduct((state) => state.setIngredients);
    const status = useProduct((state) => state.status);
    const setStatus = useProduct((state) => state.setStatus);

    // Global UI
    const setModal = useGlobal((state) => state.setModal);
    const errors = useGlobal((state) => state.errors);
    const success = useGlobal((state) => state.sucess);
    const setErrors = useGlobal(
        (state) => state.setErrors as (errors: any[]) => void
    );
    const setSuccess = useGlobal(
        (state) => state.setSucess as (success: { msg: string }[]) => void
    );

    // Opciones
    const categoriesAll = useOptions((state) => state.categories);
    const setCategoriesAll = useOptions((state) => state.setCategories);
    const ingredientsAll = useOptions((state) => state.ingredients);
    const setIngredientsAll = useOptions((state) => state.setIngredients);

    // Cargar categorías e ingredientes al abrir modal
    useEffect(() => {
        const getOptionsCategory = async () => {
            const [categoriesList, ingredientesList] = await Promise.all([
                getAllCategories(),
                getIngredientsAll(),
            ]);

            setCategoriesAll(categoriesList.categories);
            setIngredientsAll(ingredientesList.ingredients);
        };
        getOptionsCategory();
    }, []);

    // Construir URL base del backend
    const backendBase = useMemo(() => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
        return apiBase.replace(/\/api\/?$/, ''); // ej: http://localhost:4000
    }, []);

    // Previsualizar imagen actual del producto
    useEffect(() => {
        if (product?.imageUrl) {
            const fullUrl = product.imageUrl.startsWith('http')
                ? product.imageUrl
                : `${backendBase}${product.imageUrl}`;
            setPreviewImage(fullUrl);
        }
    }, [product?.imageUrl, backendBase]);

    const parsedErrors = ErrorSchema.parse(errors);
    const parsedCategories = parseCategoryToOptions(categoriesAll);
    const parsedIngredients = parseInventoryToOptions(ingredientsAll);

    const handleCloseModal = () => {
        setModal({ status: false, element: null });
        setName('');
        setPrice(0);
        setCategoryId(0);
        setIngredients([]);
        setId(0);
        setFileImage(null);
        setPreviewImage(null);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price.toString());
            formData.append('categoryId', categoryId.toString());
            formData.append('active', status.toString());
            formData.append('ingredients', JSON.stringify(ingredients));

            if (fileImage) {
                formData.append('image', fileImage);
            }

            const response = await updateProduct(id, formData);

            if (response?.errors && response.errors.length > 0) {
                setErrors(response.errors);
                setTimeout(() => {
                    setErrors([]);
                }, 1500);
                setIsLoading(false);
                return;
            }

            setSuccess([{ msg: response.msg }]);

            setTimeout(() => {
                setSuccess([]);
                setModal({ status: false, element: null });
                setName('');
                setPrice(0);
                setCategoryId(0);
                setIngredients([]);
                setId(0);
                setFileImage(null);
                setPreviewImage(null);
                navigate.push('/dashboard/productos');
                setIsLoading(false);
            }, 1500);
        } catch (err) {
            setErrors([{ msg: 'Error al actualizar el producto' } as any]);
            setTimeout(() => {
                setErrors([]);
            }, 1500);
            setIsLoading(false);
        }
    };

    return (
        <ModalLayout
            showModal={true}
            toggleModal={handleCloseModal}
            panelClassName="sm:max-w-lg"
            placement=" justify-center items-start">
            <div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
                    <h3 className="font-medium text-gray-600 dark:text-white text-lg">
                        Editar producto del menú
                    </h3>
                    <button
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                        type="button">
                        <i
                            className="ri-close-line text-2xl"
                            onClick={handleCloseModal}></i>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <h5 className="mb-2.5 text-base">Rellena todos los campos</h5>

                    {parsedErrors && parsedErrors.length > 0 && (
                        <div className="mb-6">
                            {parsedErrors.map((error, index) => (
                                <div
                                    key={index}
                                    className="bg-danger/10 text-danger border border-danger/20 text-sm rounded-md py-3 px-5 mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <i className="ri-close-circle-line text-base"></i>
                                        <p className="text-sm">
                                            Error:{' '}
                                            <span className="font-bold text-xs">
                                                {error.msg || error.message}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {success.length > 0 && (
                        <div className="bg-success/10 text-success border border-success/20 text-sm rounded-md py-3 px-5 mb-2">
                            <div className="flex items-center gap-1.5">
                                <i className="ri-check-line text-base"></i>
                                <p className="text-sm">
                                    Exito:{' '}
                                    <span className="font-bold text-xs">
                                        {success[0].msg}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}

                    <hr className="my-5 dark:border-gray-700" />

                    <form onSubmit={onSubmit}>
                        <FormInput
                            label="Nombre del producto"
                            labelClassName="font-semibold text-gray-500"
                            type="text"
                            className="form-input w-full md:w-96"
                            name="name"
                            placeholder="Ej. Enchiladas"
                            containerClass="mb-6 space-y-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <FormInput
                            label="Precio del producto"
                            labelClassName="font-semibold text-gray-500"
                            type="number"
                            className="form-input w-full md:w-96"
                            name="price"
                            placeholder="Ej. 50.00"
                            containerClass="mb-6 space-y-2"
                            value={price}
                            onChange={(e) => setPrice(+e.target.value)}
                        />

                        {/* Imagen del producto */}
                        <div className="mb-6">
                            <label className="mb-2 font-semibold text-gray-500">
                                Imagen del producto
                            </label>

                            {previewImage && (
                                <div className="mb-3">
                                    <img
                                        src={previewImage}
                                        alt="Vista previa"
                                        className="w-28 h-28 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setFileImage(file);
                                    if (file) {
                                        setPreviewImage(
                                            URL.createObjectURL(file)
                                        );
                                    }
                                }}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 font-semibold text-gray-500">
                                Categoria del producto
                            </label>
                            <Select
                                className="select2 z-5"
                                options={parsedCategories}
                                value={parsedCategories.find(
                                    (category) =>
                                        category.value === categoryId
                                )}
                                onChange={(selectedOption) =>
                                    setCategoryId(selectedOption!.value)
                                }
                            />
                        </div>

                        <div className="mb-32">
                            <label className="mb-2 font-semibold text-gray-500">
                                Ingredientes
                            </label>
                            <Select
                                isMulti
                                className="select2 z-5"
                                options={parsedIngredients}
                                value={parsedIngredients.filter((category) =>
                                    ingredients
                                        .map((ingredient) => ingredient.id)
                                        .includes(category.value)
                                )}
                                onChange={(selectedOption) =>
                                    setIngredients(
                                        selectedOption!.map((option) => ({
                                            id: option.value,
                                        }))
                                    )
                                }
                            />
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 font-semibold text-gray-500">
                                Estatús del producto
                            </label>
                            <Select
                                className="select2 z-5"
                                options={[
                                    { value: true, label: 'Activo' },
                                    { value: false, label: 'Inactivo' },
                                ]}
                                value={
                                    status
                                        ? {
                                              value: true,
                                              label: 'Activo',
                                          }
                                        : {
                                              value: false,
                                              label: 'Inactivo',
                                          }
                                }
                                onChange={(selectedOption) =>
                                    setStatus(selectedOption!.value)
                                }
                            />
                        </div>

                        <div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
                            <button
                                className="btn bg-light text-gray-800 transition-all"
                                onClick={handleCloseModal}
                                disabled={isLoading}
                                type="button">
                                Cerrar
                            </button>
                            <button
                                className="btn bg-primary text-white"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? 'Actualizando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalLayout>
    );
};

export default FormEditProduct;
