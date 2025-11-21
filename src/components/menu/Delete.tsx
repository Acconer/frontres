'use client';

import React from 'react'
import ModalLayout from '../HeadlessUI/ModalLayout'
import { useGlobal } from '@/src/store/global/store';
import { useMenu } from '@/src/store/menu/store';

const DeleteMenu = () => {
    const setModal = useGlobal(state => state.setModal);
    const deleteOrder = useMenu(state => state.clearOrder);

    const handleCloseModal = () => {
        setModal({ status: false, element: null })
    }

    const handleClose = () => {
        setModal({ status: false, element: null })
        deleteOrder()
    }
    
  return (
    <ModalLayout
            showModal={true}
            toggleModal={handleCloseModal}
            panelClassName="sm:max-w-lg"
            placement="justify-center items-start">
            <div className="duration-300 ease-in-out transition-all  m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800 dark:border-gray-700">
                <div
                    className={`flex justify-between items-center py-2.5 px-4 bg-danger/90 dark:border-gray-700`}>
                    <h3 className="font-medium text-white text-lg">
                        Eliminación de orden
                    </h3>
                    <button
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                        type="button"
                        onClick={handleCloseModal}>
                        <i className="ri-close-line text-2xl text-white"></i>
                    </button>
                </div>
                <div className={`p-4 bg-danger text-white overflow-y-auto`}>
                    <h5 className="mb-2.5 text-base">
                        ¿Estas seguro de limpiar la orden?
                    </h5>
                    <p className="text-sm mb-4">
                        Una vez eliminada la orden, no podras regresar esos productos.
                    </p>
                </div>
                <div
                    className={`flex justify-end items-center gap-2 p-4 border-t bg-danger border-white/5`}>
                    <button
                        className="btn bg-light text-gray-800 transition-all"
                        onClick={handleCloseModal}>
                        Cancelar
                    </button>
                    <button
                        className="btn border-light hover:bg-light hover:text-gray-800 text-white"
                        onClick={handleClose}>
                        Confirmar
                    </button>
                </div>
            </div>
        </ModalLayout>
  )
}

export default DeleteMenu
