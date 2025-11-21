import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CategoryListWithTotalPages } from "@/src/Objects";

export type CategoriaStore = {
    id: number;
    name: string;
    status: boolean;
    setName: (name: string) => void;
    setId: (id: number) => void;
    setStatus: (status: boolean) => void;
    categories: CategoryListWithTotalPages;
    setCategories: (categories: CategoryListWithTotalPages) => void;
    page: number;
    setPage: (page: number) => void;
    searchName: string;
    setSearchName: (name: string) => void;
}

export const useCategoria = create<CategoriaStore>()(
    devtools((set) => ({
        id: 0,
        name: '',
        status: true,
        setName: (name: string) => set({ name }),
        setId: (id: number) => set({ id }),
        categories: { categories: [], totalPages: 0 } as CategoryListWithTotalPages,
        setCategories: (categories: CategoryListWithTotalPages) => set({ categories }),
        setStatus: (status: boolean) => set({ status }),
        page: 1,
        setPage: (page: number) => set({ page }),
        searchName: '',
        setSearchName: (searchName: string) => set({ searchName })
    }))
)