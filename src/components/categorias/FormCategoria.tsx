import { useState } from "react";
import { useGlobal } from "@/src/store/global/store";
import ModalLayout from "../HeadlessUI/ModalLayout";
import FormInput from "../FormInput";
import { useCategoria } from "@/src/store/categorias/store";
import { createCategory } from "@/src/api/categorias";
import { ErrorSchema } from "@/src/Objects";

const FormCategoria = () => {
    const [isLoading, setIsLoading] = useState(false);
    const setModal = useGlobal(state => state.setModal);
    const name = useCategoria(state => state.name);
    const setName = useCategoria(state => state.setName);
    const errors = useGlobal(state => state.errors);
    const setErrors = useGlobal(state => state.setErrors);
    const success = useGlobal(state => state.sucess);
    const setSuccess = useGlobal(state => state.setSucess as (success: { msg: string }[]) => void);

    const handleClose = () => {
        setModal({ status: false, element: null });
        setName('');
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); 
        const category = await createCategory(name);
        setIsLoading(false); 

        if (category.errors && category.errors.length > 0) {
            setErrors(category.errors);

            setTimeout(() => {
                setErrors([]);
            }, 1500);
            return;
        }

        setSuccess([{ msg: 'Categoria creada correctamente' }]);
        setName('');
        setTimeout(() => {
            setSuccess([]);
            handleClose();
        }, 1500);
    };

    const parsedErrors = ErrorSchema.parse(errors);

    return (
        <ModalLayout
            showModal={true}
            toggleModal={handleClose}
            panelClassName="sm:max-w-lg"
            placement=" justify-center items-start">
            <div className="duration-300 ease-in-out transition-all m-3 sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
                    <h3 className="font-medium text-gray-600 dark:text-white text-lg">
                        Agregar categoria al menú
                    </h3>
                    <button
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                        type="button">
                        <i
                            className="ri-close-line text-2xl"
                            onClick={handleClose}></i>
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
                            label="Nombre de la categoria"
                            labelClassName="font-semibold text-gray-500"
                            type="text"
                            className="form-input w-full md:w-96"
                            name="name"
                            placeholder={"Ej. Postres"}
                            containerClass="mb-6 space-y-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="flex justify-end items-center gap-2 p-4 border-t dark:border-slate-700">
                            <button
                                className="btn bg-light text-gray-800 transition-all"
                                onClick={handleClose}
                                disabled={isLoading}>
                                Cerrar
                            </button>
                            <button
                                className={`btn ${isLoading ? "bg-gray-400" : "bg-primary"} text-white`}
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ? "Espere, creando..." : "Crear categoria"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalLayout>
    );
};

export default FormCategoria;
