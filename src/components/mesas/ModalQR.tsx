"use client";

import React, { useState } from "react";
import ModalLayout from "../HeadlessUI/ModalLayout";
import { useGlobal } from "@/src/store/global/store";
import { useTables } from "@/src/store/tables";
import { getQr } from "@/src/api/table";
import axios from "axios";

const ModalQR = () => {
    const id = useTables((state) => state.id);
    const setId = useTables((state) => state.setId);
    const setImageQr = useTables((state) => state.setImageQr);
    const imageQr = useTables((state) => state.imageQr);
    const [isLoading, setIsLoading] = useState(false);

    const setErrors = useGlobal(
        (state) => state.setErrors as (errors: { msg: string }[]) => void
    );
    const setSuccess = useGlobal(
        (state) => state.setSucess as (success: { msg: string }[]) => void
    );

    const setModal = useGlobal((state) => state.setModal);

    const generateQR = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/table/qr/${id}`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: token,
                },
                responseType: "arraybuffer", 
            });

            const blob = new Blob([response.data], { type: "image/png" });

            const imageUrl = URL.createObjectURL(blob);

            setImageQr(imageUrl);

            setSuccess([{ msg: "QR generado correctamente" }]);
            setTimeout(() => {
                setSuccess([]);
            }, 1500);
        } catch (error) {
            console.error("Error generando QR:", error);

            if (axios.isAxiosError(error)) {
                const errorMsg =
                    error.response?.data?.error || "Error al generar el QR";
                setErrors([{ msg: errorMsg }]);
            } else {
                setErrors([{ msg: "Error al generar el QR" }]);
            }

            setTimeout(() => {
                setErrors([]);
            }, 1500);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!imageQr) return;

        const link = document.createElement("a");
        link.href = imageQr;
        link.download = `qr-mesa-${id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCloseModal = () => {
        setModal({ status: false, element: null });
        setId(0);

        if (imageQr && imageQr.startsWith("blob:")) {
            URL.revokeObjectURL(imageQr);
        }
    };

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
                            Generar QR
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
                            Descarga el código QR para la mesa {id}
                        </h5>

                        <hr className="my-5 dark:border-gray-700" />
                        <div>
                            <div className="flex flex-col gap-4 mb-5">
                                {imageQr ? (
                                    <div className="w-64 h-64 mx-auto relative flex items-center justify-center">
                                        <img
                                            src={imageQr}
                                            alt={`QR Mesa ${id}`}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-64 h-64 mx-auto bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded">
                                        <p className="text-gray-400 dark:text-gray-500">
                                            QR no generado
                                        </p>
                                    </div>
                                )}
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    {imageQr
                                        ? `Escanea el código QR para acceder al menú de la mesa ${id}`
                                        : "Genera el QR para visualizarlo"}
                                </p>
                            </div>
                            <button
                                className="btn bg-light text-gray-800 transition-all w-full"
                                onClick={generateQR}
                                disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generando...
                                    </span>
                                ) : (
                                    <>
                                        <i className="ri-qr-code-line text-xl mr-2"></i>{" "}
                                        Generar QR
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="flex justify-center items-center gap-2 p-4 border-t dark:border-slate-700 mt-4">
                            <button
                                className="btn bg-light text-gray-800 transition-all gap-2"
                                onClick={handleDownload}
                                disabled={!imageQr}>
                                <i className="ri-download-line text-xl"></i>
                                Descargar QR
                            </button>
                        </div>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
};

export default ModalQR;
