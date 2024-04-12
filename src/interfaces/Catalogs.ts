export interface CatalogTable{
  id: string,
  name: string,
  collection: string
}

export interface Catalog {
  _id: string
  name: string
  collection: string
  status: boolean
  condition: any[]
  categorys: any[]
  types: any[]
  __v: number
  id: string
}