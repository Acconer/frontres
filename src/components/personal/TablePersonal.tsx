/* eslint-disable react-hooks/exhaustive-deps */


"use client";

import { getUsers } from "@/src/api/auth";
import { UserListSchema } from "@/src/Objects";
import { useEffect } from "react";
import { usePersonal } from "@/src/store/personal/store";
import { FormatDate } from "@/src/helpers/format";
import { useAuth } from "@/src/store/auth/store";
import { useGlobal } from "@/src/store/global/store";
import FormEditPersonal from "./FormEditPersonal";
import ModalDelete from "./ModalDelete";

const TablePersonal = () => {
    const users = usePersonal((state) => state.users);
    const setUsers = usePersonal((state) => state.setUsers);
    const setName = useAuth(state => state.setName);
    const setId = useAuth(state => state.setId);
    const setEmail = useAuth(state => state.setEmail);
    const setPermission = useAuth(state => state.setPermission);
    const setModal = useGlobal(state => state.setModal);

    useEffect(() => {
        const get = async () => {
            const response = await getUsers();
            const users = UserListSchema.parse(response.usersWithoutPassword);
            setUsers(users);
        };
        get();
    }, []);

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full border border-gray-300 dark:border-gray-700">
                                <thead className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Identificador
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Rol
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Creación
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Actualización
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-black text-gray-900 dark:text-gray-100 px-6 py-4 text-left border border-gray-300 dark:border-gray-700 uppercase">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users &&
                                        users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className={`${
                                                    users.indexOf(user) % 2 === 0
                                                        ? "bg-white dark:bg-gray-800"
                                                        : "bg-gray-100 dark:bg-gray-900"
                                                } border-b dark:border-gray-700`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
                                                    {user.id}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {user.name}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {user.email}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {user.permission}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {FormatDate(user.createdAt)}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap border border-gray-300 dark:border-gray-700">
                                                    {FormatDate(user.updatedAt)}
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap flex gap-2 border border-gray-300 dark:border-gray-700">
                                                    <button
                                                        type="button"
                                                        className="btn bg-primary text-white flex-1"
                                                        onClick={() => {
                                                          setModal({ status: true, element: <FormEditPersonal /> })
                                                          setName(user.name)
                                                          setEmail(user.email)
                                                          setPermission(user.permission)
                                                          setId(user.id)
                                                        }}>
                                                        Editar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn bg-danger text-white flex-1"
                                                        onClick={
                                                          () => {setModal({ status: true, element: <ModalDelete /> })
                                                          setId(user.id)} 
                                                        }
                                                        >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TablePersonal;
