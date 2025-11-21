import axios, { AxiosError } from "axios"
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const registerUser = async (name: string, email: string, password: string, permission: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                name, email, password, permission
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }}
            )
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return error
        }
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/all`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }}
            )
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return error
        }
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/delete/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }}
            )
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return error
        }
    }
}

export const updateUser = async (id: number, name: string, email: string, permission: string) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/update/${id}`, {
                name, email, permission
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }}
            )
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return error
        }
    }
}

export const updateUserPass = async (id: number, name: string, email: string, permission: string, password: string) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/update/${id}`, {
                name, email, permission, password
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }}
            )
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return error
        }
    }
}

export const getUser = async (token: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                headers: {
                    Authorization: `${token}`
            }
        })
        
        return response.data
    } catch (error) {
        if(error instanceof AxiosError) {
            return error.response!.data;
        } else {
            return error
        }
    }
}