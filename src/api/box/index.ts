import axios, { AxiosError } from "axios";
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const closeBox = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/box/create`, {}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: 'Error desconocido' };
        }
    }
}

export const getAllBoxes = async (page: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/box/list?page=${page}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: 'Error desconocido' };
        }
    }
}

export const getBoxById = async (id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/box/list/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return { msg: 'Error desconocido' };
        }
    }
}