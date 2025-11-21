export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
	role?: string
}

const MENU_ITEMS: MenuItemTypes[] = [
    {
        key: "navegacion",
        label: "Navegacion",
        isTitle: true,
        role: "All",
    },
    {
        key: "dashboard-ventas",
        label: "Ventas",
        url: "/dashboard/ventas",
        parentKey: "dashboard",
        icon: "ri-shopping-cart-2-line",
        role: "All",
    },
    {
        key: "dashboard-caja",
        label: "Caja",
        url: "/dashboard/caja",
        parentKey: "dashboard",
        icon: "ri-currency-line",
        role: "Administrador",
    },
    {
        key: "gestion",
        label: "Gestion",
        isTitle: true,
        role: "All",
    },
    {
        key: "productos",
        label: "Productos",
        isTitle: false,
        icon: "ri-store-2-line",
        url: "/dashboard/productos",
        role: "Administrador",
    },
    {
        key: "personal",
        label: "Personal",
        isTitle: false,
        icon: "ri-user-2-line",
        url: "/dashboard/personal",
        role: "Administrador",
    },
    {
        key: "inventario",
        label: "Inventario",
        isTitle: false,
        icon: "ri-archive-line",
        url: "/dashboard/inventario",
        role: "Administrador",
    },
    {
        key: "ordenes",
        label: "Ordenes",
        isTitle: false,
        icon: "ri-file-list-3-line",
        url: "/dashboard/ordenes",
        role: "All",
    },
    {
        key: "categorias",
        label: "Categorias",
        isTitle: false,
        icon: "ri-folder-3-line",
        url: "/dashboard/categorias",
        role: "Administrador",
    },
    {
        key: "mesas",
        label: "Mesas",
        isTitle: false,
        icon: "ri-table-line",
        url: "/dashboard/mesas",
        role: "Administrador",
    },
    {
        key: "menutitle",
        label: "Menu",
        isTitle: true,
    },
    {
        key: "listaordenes",
        label: "Lista Ordenes",
        isTitle: false,
        icon: "ri-file-list-3-line",
        url: "/dashboard/all",
        role: "All",
    },
    {
        key: "menu",
        label: "Menu",
        isTitle: false,
        icon: "ri-menu-line",
        url: "/menu",
        role: "All",
    },
];

export { MENU_ITEMS }
