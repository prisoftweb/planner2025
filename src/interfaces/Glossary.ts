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
