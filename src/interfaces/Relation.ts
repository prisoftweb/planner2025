import { Glossary } from "./Glossary"

export interface Relation {
  _id: string
  glossary: Glossary
  description: string
  status: boolean
  __v: number
  id: string
  nextnodo: string
}

export interface RelationTable {
  id: string, 
  description: string,
  condition: string,
  nextNode: string
}