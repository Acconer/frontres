import { BoxProductAPIType, BoxType } from "@/src/Objects";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {BoxPreviewType} from '@/src/Objects/index';

export type BoxStore = {
    box: BoxProductAPIType;
    setBox: (box: BoxProductAPIType) => void;
    page: number;
    setPage: (page: number) => void;
    boxItem: BoxType;
    setBoxItem: (boxItem: BoxType) => void;
    boxPreview: BoxPreviewType;
    setBoxPreview: (boxPreview: BoxPreviewType) => void;
};

export const useBoxStore = create<BoxStore>()(
    devtools((set) => ({
        box: {
            boxes: [],
            pages: 0
        } as BoxProductAPIType,
        setBox: (box) => set({ box }),
        page: 1,
        setPage: (page) => set({ page }),
        boxItem: {} as BoxType,
        setBoxItem: (boxItem) => set({ boxItem }),
        boxPreview: [] as BoxPreviewType,
        setBoxPreview: (boxPreview) => set({ boxPreview }),
    }))
);