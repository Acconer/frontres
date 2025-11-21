import { OptionsCategoryList, OptionsIngredientsList } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Options = {
    categories: OptionsCategoryList;
    setCategories: (categories: OptionsCategoryList) => void;
    ingredients: OptionsIngredientsList
    setIngredients: (ingredients: OptionsIngredientsList) => void;
};

export const useOptions = create<Options>()(
    devtools((set) => ({
        categories: [],
        setCategories: (categories) => set({ categories }),
        ingredients: [],
        setIngredients: (ingredients) => set({ ingredients }),
    }))
);