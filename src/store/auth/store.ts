import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUser {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    permission?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type AuthStoreProps = {
    id?: number;
    email: string;
    password: string;
    permission: string;
    name: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    user: IUser;
    setUser: (user: IUser) => void;
    setName: (name: string) => void;
    setPermission: (permission: string) => void;
    setId: (id: number) => void;
}

export const useAuth = create<AuthStoreProps>()(devtools(set => ({
    id: 0,
    email: '',
    password: '',
    permission: '',
    name: '',
    user: {} as IUser,
    setEmail: (email: string) => set(() => ({ email })),
    setPassword: (password: string) => set(() => ({ password })),
    setUser: (user: IUser) => set(() => ({ user })),
    setName: (name: string) => set(() => ({ name })),
    setPermission: (permission: string) => set(() => ({ permission })),
    setId: (id: number) => set(() => ({ id })),
})));