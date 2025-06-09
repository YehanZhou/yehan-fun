export interface CategoryInterface {
  id: string
  name: string
  icon?: string
  links?: LinkInterface[]
}

export interface LinkInterface {
  id: string
  title: string
  url: string
  categoryId: string
}