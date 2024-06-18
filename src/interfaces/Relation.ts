import { Glossary } from "./Glossary"
import { Node } from "./Nodes"

export interface Relation {
  _id: string
  glossary: Glossary
  description: string
  status: boolean
  __v: number
  id: string
  nextnodo: (string | Node);
}

export interface RelationTable {
  id: string, 
  description: string,
  condition: string,
  nextNode: string
}