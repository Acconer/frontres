'use client'

import React, { useState } from 'react'
import Select from 'react-select'
import ModalLayout from '../HeadlessUI/ModalLayout'
import FormInput from '../FormInput'
import { roles } from '@/src/data/roles'
import { useAuth } from '@/src/store/auth/store'
import { useGlobal } from '@/src/store/global/store'
import { updateUser, updateUserPass } from '@/src/api/auth';
import { ErrorSchema } from '@/src/Objects'

const FormEditPersonal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el botón
    const id = useAuth(state => state.id)
    const name = useAuth(state => state.name)
    const email = useAuth(state => state.email)
    const password = useAuth(state => state.password)
    const permission = useAuth(state => state.permission)
    const setName = useAuth(state => state.setName)
    const setId = useAuth((state) => state.setId)
    const setEmail = useAuth(state => state.setEmail)
    const setPassword = useAuth(state => state.setPassword)
    const setPermission = useAuth(state => state.setPermission)
    const setModal = useGlobal(state => state.setModal);
    const errors = useGlobal(state => state.errors);
    const success = useGlobal(state => state.sucess);
    const setErrors = useGlobal(state => state.setErrors);
    const setSuccess = useGlobal(state => state.setSucess as (success: { msg: string }[]) => void);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (password !== '') {
                const userEditPassword = await updateUserPass(id, name, email, permission, password);
                if (userEditPassword.errors && userEditPassword.errors.length > 0) {
                    setErrors(userEditPassword.errors);
                    setTimeout(() => {
                        setErrors([]);
                    }, 1500);
                    return;
                }

                setSuccess([{ msg: userEditPassword.msg }]);
            } else {
                const userEdit = await updateUser(id, name, email, permission);
                if (userEdit.errors && userEdit.errors.length > 0) {
                    setErrors(userEdit.errors);
                    setTimeout(() => {
                        setErrors([]);
                    }, 1500);
                    return;
                }

                setSuccess([{ msg: userEdit.msg }]);
            }

            setTimeout(() => {
                setSuccess([]);
                setModal({ status: false, element: null });
                setId(0);
                setName('');
                setEmail('');
                setPassword('');
                setPermission('');
            }, 1500);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setModal({ status: false, element: null });
        setId(0);
        setName('');
        setEmail('');
        setPassword('');
        setPermission('');
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
                            Editar personal
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
                            Todos los campos son obligatorios
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

                        {
                            success.length > 0 && (
                                <div className="bg-success/10 text-success border border-success/20 text-sm rounded-md py-3 px-5 mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <i className={`ri-check-line text-base`}></i>
                                        <p className="text-sm">
                                            Exito: <span className="font-bold text-xs">{success[0].msg}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        <hr className="my-5 dark:border-gray-700" />
                        <form onSubmit={onSubmit}>
                            <FormInput
                                label="Nombre del personal"
                                labelClassName="font-semibold text-gray-500"
                                type="text"
                                className="form-input w-full md:w-96"
                                name="name"
                                placeholder={"Perla ..."}
                                containerClass="mb-6 space-y-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <FormInput
                                label="Correo electronico"
                                labelClassName="font-semibold text-gray-500"
                                type="email"
                                className="form-input w-full md:w-96"
                                name="email"
                                placeholder={"aless@lowsolutions.tech"}
                                containerClass="mb-6 space-y-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormInput
                                label="Contraseña"
                                labelClassName="font-semibold text-gray-500"
                                type="text"
                                className="form-input w-full md:w-96"
                                name="password"
                                placeholder={"*************"}
                                containerClass="mb-6 space-y-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div>
                                <label className="mb-2 font-semibold text-gray-500" htmlFor="choices-text-remove-button">
                                    Rol
                                </label>
                                <Select
                                    className="select2 z-5"
                                    options={roles}
                                    value={roles.find(role => role.value === permission)}
                                    onChange={(selectedOption) => setPermission(selectedOption!.value)}
                                />
                            </div>
                            <div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
                                <button
                                    className="btn bg-light text-gray-800 transition-all"
                                    onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button
                                    className={`btn bg-primary text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    type="submit"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? 'Actualizando...' : 'Confirmar cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}

export default FormEditPersonal
