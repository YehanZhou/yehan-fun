export interface LinkInterface {
    id: number
    name: string
    icon: string
    url: string
    description: string
    rank: number
    // createTime: string
    // updateTime: string
    public: boolean
    status: number
    categoryId: number
}

export interface NavItem {
    name: string
    href?: string
    disabled?: boolean
    external?: boolean
}