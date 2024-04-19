export interface GlossaryTable {
  id: string,
  name: string,
  description: string,
  color: string
}

export interface Glossary {
  _id: string
  name: string
  description: string
  color?: string
  status: boolean
  __v: number
  id: string
}

export interface GlossaryCatalog {
  _id: string
  name: string
  collection: string
  status: boolean
  condition: GlossaryType[]
  categorys: GlossaryType[]
  types: GlossaryType[]
  __v: number
  id: string
}

export interface GlossaryType {
  glossary: Glossary
  status: boolean
  _id: string
  id: string
}