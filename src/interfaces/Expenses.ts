import { Glossary } from "./Glossary"
import { UsrBack } from "./User"
import { Provider } from "./Providers"
import { CostCenter } from "./CostCenter"
import { Project } from "./Projects"

export interface ExpensesTable {
  id: string
  Responsable: {
    responsible: string,
    photo: string
  } 
  Proyecto: string 
  Informe: string 
  Descripcion: string 
  Proveedor: string 
  Estatus: string 
  Fecha: string 
  Importe: string
  condition: string
}

export interface Expense {
  _id: string
  folio: string
  taxfolio: string
  subtotal: number
  discount: number
  description: string
  date: string
  taxapply: boolean
  ispaid: boolean
  category: Glossary
  typeCFDI: Glossary
  user: UsrBack
  provider: Provider
  costcenter: CostCenter
  project: Project
  status: boolean
  condition: Condition[]
  files: File[]
  total: number
  iva: number
  __v: number
  id: string
  report: string
  isticket: boolean
}

export interface File {
  file: string
  types: string
  _id: string
  id: string
}

export interface Condition {
  glossary: Glossary
  date: string
  user: string
  status: boolean
  _id: string
  id: string
}