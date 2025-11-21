import { ProductWithCategoryWithIngredients, ProductWithCategoryWithIngredientsList } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ProductStore = {
    id: number
    name: string;
    price: number;
    categoryId: number;
    ingredients: { id: number }[];
    setName: (name: string) => void;
    setPrice: (price: number) => void;
    setCategoryId: (categoryId: number) => void;
    setIngredients: (ingredients: { id: number }[]) => void;
    products: {products: ProductWithCategoryWithIngredientsList, totalPages: number};
    setProducts: (products: {products: ProductWithCategoryWithIngredientsList, totalPages: number}) => void;
    page: number;
    setPage: (page: number) => void;
    status: boolean;
    setStatus: (status: boolean) => void;
    product: ProductWithCategoryWithIngredients;
    setProduct: (product: ProductWithCategoryWithIngredients) => void;
    setId: (id: number) => void;
}

export const useProduct = create<ProductStore>()(
    devtools((set) => ({
        id: 0,
        name: "",
        price: 0,
        categoryId: 0,
        ingredients: [],
        setName: (name) => set({ name }),
        setPrice: (price) => set({ price }),
        setCategoryId: (categoryId) => set({ categoryId }),
        setIngredients: (ingredients) => set({ ingredients }),
        products: {products: [], totalPages: 0},
        setProducts: (products) => set({ products }),
        page: 1,
        setPage: (page) => set({ page }),
        status: true,
        setStatus: (status) => set({ status }),
        product: {} as ProductWithCategoryWithIngredients,
        setProduct: (product) => set({ product }),
        setId: (id) => set({ id }),
    }))
);
