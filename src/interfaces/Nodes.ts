import { Department } from "./Departments"
import { Glossary } from "./Glossary"
import { Workflow } from "./Workflows"

export interface Node {
  _id: string
  department: Department
  glossary: Glossary
  relations: any[]
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