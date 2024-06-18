import { Department } from "./Departments"
import { Glossary } from "./Glossary"
import { Workflow } from "./Workflows"
import { Relation as Rel } from "./Relation"

export interface Node {
  ohter: boolean
  _id: string
  department: Department
  glossary: Glossary
  relations: Relation[]
  workflow: Workflow
  status: boolean
  __v: number
  id: string
}

export interface NodeTable {
  id: string,
  workflow: string,
  department: string,
  caminos: string,
  condition: string
}

export interface Relation {
  //relation: Relation2
  relation: Rel,
  _id: string
  id: string
}
