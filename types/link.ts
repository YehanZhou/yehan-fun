export interface LinkInterface {
    id: number
    name: string
    url: string

    icon?: string | null; // 修改这里，允许icon为null
    description?: string | null;
    rank?: number | null;
    // public: boolean
    // status: number
    categoryId: number
}

export interface NavItem {
    name: string
    href?: string
    disabled?: boolean
    external?: boolean
}