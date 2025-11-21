'use client';

import React, { useState } from 'react';
import ModalLayout from '../HeadlessUI/ModalLayout';
import { useGlobal } from '@/src/store/global/store';
import { ErrorSchema } from '@/src/Objects';
import { useRouter } from 'next/navigation';
import { closeBox } from '@/src/api/box';

const ModalCloseCaja = () => {
    const setModal = useGlobal(state => state.setModal);
    const setErrors = useGlobal(state => state.setErrors);
    const errors = useGlobal(state => state.errors);
    const setSuccess = useGlobal(state => state.setSucess as (success: { msg: string }[]) => void);
    const sucess = useGlobal(state => state.sucess);
    const navigate = useRouter();

    const [isProcessing, setIsProcessing] = useState(false);

    const handleCloseModal = () => {
        if (!isProcessing) {
            setModal({ status: false, element: null });
        }
    };

    const handleDelete = async () => {
        setIsProcessing(true);
        const response = await closeBox();
        if (response.errors && response.errors.length > 0) {
            setErrors(response.errors);

            setTimeout(() => {
                setErrors([]);
                setIsProcessing(false);
            }, 1500);
            return;
        }

        setSuccess([{ msg: 'Caja cerrada exitosamente' }]);
        setTimeout(() => {
            setSuccess([]);
            handleCloseModal();
            navigate.push('/dashboard/caja');
            window.location.reload();
        }, 1500);
    };

    const errorsParsed = ErrorSchema.parse(errors);

    return (
        <ModalLayout
            showModal={true}
            toggleModal={handleCloseModal}
            panelClassName="sm:max-w-lg"
            placement="justify-center items-start">
            <div className="duration-300 ease-in-out transition-all  m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800 dark:border-gray-700">
                <div
                    className={`flex justify-between items-center py-2.5 px-4 bg-success/90 dark:border-gray-700`}>
                    <h3 className="font-medium text-white text-lg">
                        Cerrar caja
                    </h3>
                    <button
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                        type="button"
                        onClick={handleCloseModal}>
                        <i className="ri-close-line text-2xl text-white"></i>
                    </button>
                </div>
                <div className={`p-4 bg-success text-white overflow-y-auto`}>
                    {errorsParsed.length > 0 && (
                        <div className="mb-6">
                            {errorsParsed.map((error, index) => (
                                <div key={index} className={`bg-warning text-white border border-danger/20 text-sm rounded-md py-3 px-5 mb-2`}>
                                    <div className="flex items-center gap-1.5">
                                        <i className={`ri-close-circle-line text-base`}></i>
                                        <p className="text-sm">
                                            Error: <span className="font-bold">{error.msg}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {sucess.length > 0 && (
                        <div className="bg-info text-white border border-success/20 text-sm rounded-md py-3 px-5 mb-2">
                            <div className="flex items-center gap-1.5">
                                <i className={`ri-check-line text-base`}></i>
                                <p className="text-sm">
                                    Exito: <span className="font-bold">{sucess[0].msg}</span>
                                </p>
                            </div>
                        </div>
                    )}
                    <h5 className="mb-2.5 text-base">
                        ¿Estás seguro de cerrar la caja?
                    </h5>
                    <p className="text-sm mb-4">
                        Al cerrar la caja, se finalizará la ordenes y se generará un reporte de cierre.
                        <span className='text-red-500 font-black'>(Nada es posible de recuperar)</span>
                    </p>
                </div>
                <div
                    className={`flex justify-end items-center gap-2 p-4 border-t bg-success border-white/5`}>
                    <button
                        className="btn bg-light text-gray-800 transition-all"
                        onClick={handleCloseModal}
                        disabled={isProcessing}>
                        Cancelar
                    </button>
                    <button
                        className={`btn border-light hover:bg-light hover:text-gray-800 text-white ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleDelete}
                        disabled={isProcessing}>
                        {isProcessing ? 'Cerrando, espere...' : 'Cerrar Caja'}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default ModalCloseCaja;
