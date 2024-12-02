import { LinkInterface } from "./link"

export interface CategoryInterface {
    id: number
    name: string
    icon?: string | null
    description?: string | null
    rank?: number | null
    links: LinkInterface[]
}