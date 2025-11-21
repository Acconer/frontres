"use client";

import { getTables } from "@/src/api/table";
import { useTables } from "@/src/store/tables";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import LogoContainer from "@/src/helpers/logo-container";

const AlertOcupied = ({ onClose }) => {
    const alertRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (alertRef.current && !alertRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={alertRef}
                className="bg-red-500 text-white p-4 rounded-lg shadow-md max-w-md animate-fade-in">
                <p className="text-center">
                    Mesa ocupada, por favor selecciona otra mesa.
                </p>
            </div>
        </div>
    );
};

const TableSelectPage = () => {
    const tables = useTables((state) => state.tables);
    const setTables = useTables((state) => state.setTables);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const getTablesList = async () => {
            const response = await getTables();
            setTables(response);
        };

        getTablesList();
    }, [setTables]);

    const handleOccupiedTable = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <>
            {showAlert && <AlertOcupied onClose={closeAlert} />}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-4 mx-auto bg-gray-50 p-6 dark:bg-gray-900 rounded-lg relative overflow-y-auto min-h-screen h-[calc(100vh-20px)] overflow-hidden">
                <div className="bg-white dark:bg-gray-800 p-6 flex flex-col rounded-lg shadow-md">
                    <LogoContainer />
                    <h1 className="uppercase text-gray-800 dark:text-white font-black text-2xl text-center my-5">
                        Restaurante La Perla
                    </h1>
                    <Image
                        src="/image.png"
                        alt="Restaurante La Perla"
                        width={300}
                        height={200}
                        className="mx-auto"
                    />
                    <p className="text-gray-700 dark:text-gray-300 text-xl my-auto font-medium text-center">
                        Selecciona una mesa para comenzar a tomar tus{" "}
                        <span className="text-indigo-600 font-bold">Ordenes</span>
                    </p>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-30px)] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {tables.map((table) => (
                            <Link
                                key={table.id}
                                href={`/menu/mesa/${table.numTable}/category/postres`}
                                className={clsx(
                                    "relative  text-white text-center px-4 py-6 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105",
                                    table.status
                                        ? "bg-red-500 dark:bg-red-600 border-red-700 text-gray-200 cursor-not-allowed hover:scale-100"
                                        : "bg-green-500 dark:bg-green-600 border-green-700 text-white cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
                                )}
                                onClick={(e) => {
                                    if (table.status) {
                                        handleOccupiedTable(e);
                                    }
                                }}>
                                <div
                                    className={clsx(
                                        "absolute top-2 left-2 w-4 h-4 rounded-full",
                                        table.status ? "bg-red-900" : "bg-green-900"
                                    )}></div>
                                Mesa:{" "}
                                <span className="text-white">{table.numTable}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TableSelectPage;
