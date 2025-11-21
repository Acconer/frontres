'use client'

import React, { useState } from 'react'
import ModalLayout from '../HeadlessUI/ModalLayout'
import FormInput from '../FormInput'
import { useGlobal } from '@/src/store/global/store'
import { ErrorSchema } from '@/src/Objects'
import { useInventario } from '@/src/store/inventario/store'
import { createIngredient } from '@/src/api/inventarios'

const FormIngredient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const name = useInventario(state => state.nombre);
    const quantity = useInventario(state => state.quantity);
    const setName = useInventario(state => state.setNombre);
    const setQuantity = useInventario(state => state.setQuantity);
    const setModal = useGlobal(state => state.setModal);
    const errors = useGlobal(state => state.errors);
    const success = useGlobal(state => state.sucess);
    const setErrors = useGlobal(state => state.setErrors  as (errors: { msg: string }[]) => void);
    const setSuccess = useGlobal(state => state.setSucess as (success: { msg: string }[]) => void);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (quantity < 1) {
            setErrors([{ msg: 'La cantidad no puede ser menor a 1' }]);
            setTimeout(() => {
                setErrors([]);
            }, 1500);
            setIsLoading(false);
            return;
        }

        const inventoryRegister = await createIngredient(name, quantity);
        if (inventoryRegister.errors && inventoryRegister.errors.length > 0) {
            setErrors(inventoryRegister.errors);
            setTimeout(() => {
                setErrors([]);
            }, 1500);
            setIsLoading(false);
            return;
        }

        setSuccess([{ msg: inventoryRegister.msg }]);

        setTimeout(() => {
            setSuccess([]);
            setModal({ status: false, element: null });
            setName('');
            setQuantity(0);
            setIsLoading(false);
        }, 1500);
    };

    const handleCloseModal = () => {
        setModal({ status: false, element: null });
        setName('');
        setQuantity(0);
    };

    const parsedErrors = ErrorSchema.parse(errors);

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
                            Agregar ingrediente / inventario
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
                                                Error: <span className="font-bold text-xs">{error.msg}</span>
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
                                label="Nombre del ingrediente"
                                labelClassName="font-semibold text-gray-500"
                                type="text"
                                className="form-input w-full md:w-96"
                                name="name"
                                placeholder={"Ej. Mojarras"}
                                containerClass="mb-6 space-y-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <FormInput
                                label="Stock / Cantidad"
                                labelClassName="font-semibold text-gray-500"
                                type="number"
                                className="form-input w-full md:w-96"
                                name="stock"
                                placeholder={"Ej. 100"}
                                containerClass="mb-6 space-y-2"
                                value={quantity}
                                onChange={(e) => setQuantity(+e.target.value)}
                            />
                            <div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
                                <button
                                    className="btn bg-light text-gray-800 transition-all"
                                    onClick={handleCloseModal}
                                    disabled={isLoading}>
                                    Cerrar
                                </button>
                                <button
                                    className={`btn ${isLoading ? 'bg-gray-400' : 'bg-primary'} text-white`}
                                    type="submit"
                                    disabled={isLoading}>
                                    {isLoading ? 'Agregando, espere...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
};

export default FormIngredient;
