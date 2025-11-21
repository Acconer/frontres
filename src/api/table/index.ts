import { OrderItemAPIListType } from "@/src/Objects";
import axios, { AxiosError } from "axios";
import { number } from "zod";

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const createTable = async (numTable: number, capacity: number) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/table/create`, {
            numTable: numTable,
            capacity: capacity
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
}

export const getTables = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/table/list`);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
}

export const updateTable = async (id: number, numTable: number, capacity: number) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/table/update/${id}`, {
            numTable: numTable,
            capacity: capacity
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
}

export const deleteTable = async (id: number) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/table/delete/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
}

export const getQr = async (id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/table/qr/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
}