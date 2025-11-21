import { OrderItemAPIListType } from "@/src/Objects";
import axios, { AxiosError } from "axios";

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const createOrder = async (order: OrderItemAPIListType, numMesa: number) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
            products: order,
            table: numMesa
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

export const getOrders = async (status: string = 'completed') => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/all?status=${status}`, {
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

export const getOrderById = async (id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/get/${id}`, {
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

export const finishOrder = async (id: number, method: string, status: boolean = true) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/order/change-status/${id}` , {
            status: status,
	        methodPayment: method
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

export const deleteOrder = async (id: number) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/order/delete/${id}`, {
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

export const updateOrder = async (id: number, order: OrderItemAPIListType) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/order/update/${id}`, {
            products: order
        }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
}

    export const getAllItems = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/get-summary`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response!.data;
            } else {
                return { msg: "Error desconocido" };
            }
        }
};
    
export const getAll = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/order/all`,
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: "Error desconocido" };
        }
    }
};