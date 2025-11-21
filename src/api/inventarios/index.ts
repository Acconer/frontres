import axios, { AxiosError } from "axios";
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const createIngredient = async (name: string, quantity: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/ingredient/create`,
            {
                name,
                quantity,
            },
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
            console.log(error);
        }
    }
};

export const getAllIngredients = async (page: number = 1, name: string = '') => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/list?page=${page}&namesearch=${name}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response!.data;
        } else {
            console.log(error);
        }
    }
}

export const updateIngredient = async (id: number, name: string, quantity: number, status: boolean) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/ingredient/update/${id}`,
            {
                name,
                quantity,
                status
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            }
        );

        return response.data;  
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            console.log(error);
        }
    }
};

export const getIngredientsAll = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/list`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response!.data;
        } else {
            console.log(error);
        }
    }
}