/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import Select from 'react-select'
import ModalLayout from '../HeadlessUI/ModalLayout'
import FormInput from '../FormInput'
import { useGlobal } from '@/src/store/global/store'
import { ErrorSchema, parseCategoryToOptions, parseInventoryToOptions } from '@/src/Objects'
import { useEffect, useState } from 'react'
import { getAllCategories } from '@/src/api/categorias'
import { useOptions } from '@/src/store/options/store'
import { useProduct } from '@/src/store/product/store'
import { getIngredientsAll } from '@/src/api/inventarios'
import { createProduct } from '@/src/api/product'

const FormProduct = () => {
    const name = useProduct(state => state.name)
    const setName = useProduct(state => state.setName)
    const price = useProduct(state => state.price)
    const setPrice = useProduct(state => state.setPrice)
    const categoryId = useProduct(state => state.categoryId)
    const setCategoryId = useProduct(state => state.setCategoryId)
    const ingredients = useProduct(state => state.ingredients)
    const setIngredients = useProduct(state => state.setIngredients)
    const setModal = useGlobal(state => state.setModal);
    const errors = useGlobal(state => state.errors);
    const success = useGlobal(state => state.sucess);
    const setErrors = useGlobal(
        state => state.setErrors as (errors: any[]) => void
    );
    const setSuccess = useGlobal(state => state.setSucess as (success: { msg: string }[]) => void);
    const categoriesAll = useOptions(state => state.categories);
    const setCategoriesAll = useOptions(state => state.setCategories);
    const ingredientsAll = useOptions(state => state.ingredients);
    const setIngredientsAll = useOptions(state => state.setIngredients);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // 👇 NUEVO: estado para la imagen
    const [imageFile, setImageFile] = useState<File | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Construimos FormData porque ahora enviamos un archivo
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', String(price));
            formData.append('categoryId', String(categoryId));
            formData.append('ingredients', JSON.stringify(ingredients)); // se parsea en backend

            if (imageFile) {
                formData.append('image', imageFile); // 👈 debe coincidir con uploadProductImage.single('image')
            }

            const response = await createProduct(formData);

            if (response.errors && response.errors.length > 0) {
                setErrors(response.errors);
                setTimeout(() => {
                    setErrors([]);
                }, 1500);
                setIsSubmitting(false);
                return;
            } else {
                setSuccess([{ msg: response.msg }]);

                setTimeout(() => {
                    setSuccess([]);
                    setModal({ status: false, element: null });
                    setName('');
                    setPrice(0);
                    setCategoryId(0);
                    setIngredients([]);
                    setImageFile(null); // limpiamos la imagen también
                    setIsSubmitting(false);
                }, 1500);
            }
        } catch (err) {
            setErrors([{ message: 'Error al crear el producto' } as any]);
            setTimeout(() => {
                setErrors([]);
            }, 1500);
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setModal({ status: false, element: null });
        setName('');
        setPrice(0);
        setCategoryId(0);
        setIngredients([]);
        setImageFile(null);
    };

    const parsedErrors = ErrorSchema.parse(errors);

    useEffect(() => {
        const getOptionsCategory = async () => {
            const [categoriesList, ingredientesList] = await Promise.all([getAllCategories(), getIngredientsAll()]);
            setCategoriesAll(categoriesList.categories);
            setIngredientsAll(ingredientesList.ingredients);
        };
        getOptionsCategory();
    }, []);

    const parsed = parseCategoryToOptions(categoriesAll);
    const parsedIngredients = parseInventoryToOptions(ingredientsAll);

    return (
        <>
            <ModalLayout
                showModal={true}
                toggleModal={handleCloseModal}
                panelClassName="sm:max-w-lg"
                placement=" justify-center items-start">
                <div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                    <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
                        <h3 className="font-medium text-gray-600 dark:text-white text-lg">
                            Agregar productos al menú
                        </h3>
                        <button
                            className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                            type="button">
                            <i
                                className="ri-close-line text-2xl"
                                onClick={handleCloseModal}></i>
                        </button>
                    </div>
                    <div className={`p-4 overflow-y-auto`}>
                        <h5 className="mb-2.5 text-base">
                            Rellena todos los campos
                        </h5>

                        {parsedErrors && parsedErrors.length > 0 && (
                            <div className="mb-6">
                                {parsedErrors.map((error, index) => (
                                    <div key={index} className={`bg-danger/10 text-danger border border-danger/20 text-sm rounded-md py-3 px-5 mb-2`}>
                                        <div className="flex items-center gap-1.5">
                                            <i className={`ri-close-circle-line text-base`}></i>
                                            <p className="text-sm">
                                                Error: <span className="font-bold text-xs">{error.msg || error.message}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {success.length > 0 && (
                            <div className="bg-success/10 text-success border border-success/20 text-sm rounded-md py-3 px-5 mb-2">
                                <div className="flex items-center gap-1.5">
                                    <i className={`ri-check-line text-base`}></i>
                                    <p className="text-sm">
                                        Exito: <span className="font-bold text-xs">{success[0].msg}</span>
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
                                placeholder={"Ej. Enchiladas"}
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
                                placeholder={"Ej. 50.00"}
                                containerClass="mb-6 space-y-2"
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            />

                            {/* 👇 NUEVO: input para la imagen del producto */}
                            <div className="mb-6 space-y-2">
                                <label className="font-semibold text-gray-500">
                                    Imagen del producto
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setImageFile(file);
                                    }}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                />
                            </div>

                            <div className='mb-5'>
                                <label className="mb-2 font-semibold text-gray-500" htmlFor="choices-text-remove-button">
                                    Categoria del producto
                                </label>
                                <Select
                                    className="select2 z-5"
                                    options={parsed}
                                    value={parsed.find(category => category.value === categoryId)}
                                    onChange={(selectedOption) => setCategoryId(selectedOption!.value)}
                                />
                            </div>
                            <div className='mb-32'>
                                <label className="mb-2 font-semibold text-gray-500" htmlFor="choices-text-remove-button">
                                    Ingredientes
                                </label>
                                <Select
                                    isMulti
                                    className="select2 z-5"
                                    options={parsedIngredients}
                                    value={parsedIngredients.filter(category => ingredients.map(ingredient => ingredient.id).includes(category.value))}
                                    onChange={(selectedOption) => setIngredients(selectedOption!.map(option => ({ id: option.value })))}
                                />
                            </div>
                            <div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
                                <button
                                    className="btn bg-light text-gray-800 transition-all"
                                    onClick={handleCloseModal}>
                                    Cerrar
                                </button>
                                <button
                                    className="btn bg-primary text-white"
                                    type="submit"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? 'Creando, espere...' : 'Crear producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
};

export default FormProduct;
