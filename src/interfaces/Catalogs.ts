import { Glossary } from "./Glossary"

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
  condition: GlossaryComponent[]
  categorys: GlossaryComponent[]
  types: GlossaryComponent[]
  __v: number
  id: string
}

export interface GlossaryComponent {
  glossary: Glossary
  status: boolean
  _id: string
  id: string
}