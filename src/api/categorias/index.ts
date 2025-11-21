import axios, { AxiosError } from "axios";

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const createCategory = async (name: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/create`, { name }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}

export const getCategories = async (page: number = 1, search: string = '') => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all?products=include&page=${page}&nameproduct=${search}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}

export const updateCategory = async (name: string, id: number, status: boolean) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/category/update/${id}`, { name, active: status }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/delete/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}

export const getCategoryActives = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all?status=active&products=include`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}

export const getCategoryName = async (name: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/get-name/${name}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data
        } else {
            console.log(error)
        }
    }
}