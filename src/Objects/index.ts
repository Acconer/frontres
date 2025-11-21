import { z } from 'zod';

export const ErrorSchema = z.object({
    msg: z.string().optional(),
    message: z.string().optional(),
}).array();

export type ErrorObject = z.infer<typeof ErrorSchema>;

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    permission: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const UserListSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
export type UserList = z.infer<typeof UserListSchema>;

export const ProductCategory = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    status: z.string(),
    categoryId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    imageUrl: z.string().nullable().optional()
})

export const Category = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    products: z.array(ProductCategory).optional()
});

export const CategoryArrayWithTotalPages = z.object({
    categories: z.array(Category),
    totalPages: z.number().optional()
});

export type CategoryOutProduct = Pick<z.infer<typeof Category>, 'id' | 'name' | 'active' | 'createdAt' | 'updatedAt'>;
export type CategoryInProduct = z.infer<typeof Category>;
export type CategoryListWithTotalPages = z.infer<typeof CategoryArrayWithTotalPages>;

export const InventarioSchema = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    status: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const InventarioListSchema = z.object({
    ingredients: z.array(InventarioSchema),
    totalPages: z.number().optional()
});

export type Inventario = z.infer<typeof InventarioSchema>;
export type InventarioList = z.infer<typeof InventarioListSchema>;

export const OptionsCategory = z.object({
    id: z.number(),
    name: z.string(),
    active : z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
}).array();
export type OptionsCategoryList = z.infer<typeof OptionsCategory>;

export const parseCategoryToOptions = (categories: OptionsCategoryList) => {
    return categories.map(category => ({
        value: category.id,
        label: category.name
    }));
}

export const OptionsIngredients = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    status: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
}).array();

export type OptionsIngredientsList = z.infer<typeof OptionsIngredients>;

export const parseInventoryToOptions = (inventories: OptionsIngredientsList) => {
    return inventories.map(inventory => ({
        value: inventory.id,
        label: inventory.name
    }));
}

export type CategoryProduct = Pick<z.infer<typeof Category>, 'id' | 'name' | 'active' | 'createdAt' | 'updatedAt'>;

export const ProductIngredient = z.object({
    createdAt: z.string(),
    ingredientId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    updatedAt: z.string()
});

export type ProductIngredient = z.infer<typeof ProductIngredient>;

export const IngredientWithProduct = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    status: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    ProductIngredient: ProductIngredient
});

export const ProductWithCategoryWithIngredientsObj = z.object({
    categoryId: z.number(),
    createdAt: z.string(),
    id: z.number(),
    name: z.string(),
    imageUrl: z.string().nullable().optional(),
    price: z.number(),
    status: z.boolean(),
    updatedAt: z.string(),
    category: Category.pick({ id: true, name: true, active: true, createdAt: true, updatedAt: true }),
    ingredients: z.array(IngredientWithProduct)
});

export const ProductWithCategoryWithIngredientsListObj = z.array(ProductWithCategoryWithIngredientsObj);

export type ProductWithCategoryWithIngredients = z.infer<typeof ProductWithCategoryWithIngredientsObj>;
export type ProductWithCategoryWithIngredientsList = z.infer<typeof ProductWithCategoryWithIngredientsListObj>;
export type ProductWithCategoryWithIngredientsListAndPage = z.infer<typeof ProductWithCategoryWithIngredientsListObj> & { totalPages: number };

export const OrderItem = z.object({
    id: z.number(),
    quantity: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    name: z.string(),
    price: z.number(),
    status: z.boolean().or(z.string()),
    categoryId: z.number()
});

export type OrderItemType = z.infer<typeof OrderItem>;

export const OrderItemAPI = z.object({
    id: z.number(),
    quantity: z.number()
});

export const OrderItemAPIList = z.array(OrderItemAPI);

export type OrderItemAPIType = z.infer<typeof OrderItemAPI>;
export type OrderItemAPIListType = z.infer<typeof OrderItemAPIList>;

export const OrderProductItem = z.object({
    createdAt: z.string(),
    orderId: z.number(),
    price: z.number(),
    productId: z.number(),
    quantity: z.number(),
    total: z.number(),
    updatedAt: z.string()
})

export const ProductItem = z.object({
    OrderProduct: OrderProductItem,
    categoryId: z.number(),
    createdAt: z.string(),
    id: z.number(),
    name: z.string(),
    price: z.number(),
    status: z.boolean(),
    updatedAt: z.string(),
    imageUrl: z.string().nullable().optional()
})

export const OrderItemIndividual = z.object({
    createdAt: z.string(),
    date: z.string(),
    finishDate: z.string().optional(),
    id: z.number(),
    mesero: z.string(),
    methodPayment: z.string().optional(),
    products: z.array(ProductItem),
    status: z.boolean(),
    total: z.number(),
    updatedAt: z.string(),
    numTable: z.number()
});

export const OrderItemMenu = z.object({
    createdAt: z.string(),
    date: z.string(),
    finishDate: z.string().optional(),
    id: z.number(),
    mesero: z.string(),
    numTable: z.number(),
    methodPayment: z.string().optional(),
    products: z.array(ProductItem),
    status: z.boolean(),
    total: z.number(),
    updatedAt: z.string()
}).array();

export type OrderItemMenuType = z.infer<typeof OrderItemMenu>;
export type OrderItemIndividualType = z.infer<typeof OrderItemIndividual>;

export const BoxProduct = z.object({
    boxId: z.number(),
    createdAt: z.string(),
    price: z.number(),
    productId: z.number(),
    quantity: z.number(),
    total: z.number(),
    updatedAt: z.string()
});

export const BoxProductList = z.array(z.object({
    categoryId: z.number(),
    createdAt: z.string(),
    id: z.number(),
    name: z.string(),
    price: z.number(),
    status: z.boolean(),
    updatedAt: z.string(),
    BoxProduct: BoxProduct
}));

export type BoxProductType = z.infer<typeof BoxProduct>;

export const Box = z.object({
    createdAt: z.string(),
    date: z.string(),
    id: z.number(),
    name: z.string(),
    related_products: BoxProductList,
    total: z.number(),
    updatedAt: z.string()
});

export type BoxType = z.infer<typeof Box>;
export const BoxList = z.array(Box);

export const BoxProductAPI = z.object({
    boxes: BoxList,
    pages: z.number()
});

export type BoxProductAPIType = z.infer<typeof BoxProductAPI>;

export const SearchProduct = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    status: z.boolean(),
    categoryId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    imageUrl: z.string().nullable().optional()
});

export const SearchProductList = z.array(SearchProduct);
export type SearchProductType = z.infer<typeof SearchProduct>;
export type SearchProductListType = z.infer<typeof SearchProductList>;

export const boxPreview = z.object({
    id: z.number(),
    name: z.string(),
    totalQuantity: z.number(),
    totalPrice: z.number()
}).array();
export type BoxPreviewType = z.infer<typeof boxPreview>;