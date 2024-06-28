import { Glossary } from "./Glossary"
import { UsrBack } from "./User"
import { Provider } from "./Providers"
import { CostCenter } from "./CostCenter"
import { Project } from "./Projects"
import { Report } from "./Reports"

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
  condition: string,
  archivos: string[],
  costcenter: string,
  vat: string,
  discount: string,
  total: string
}

export interface Expense {
  cost: Cost
  _id: string
  folio: string
  taxfolio: string
  description: string
  date: string
  taxapply: boolean
  ispaid: boolean
  category: Glossary
  typeCFDI: Glossary
  user: UsrBack
  provider: Provider
  //costcenter: CostCenter
  costcenter:(string | CostCenter)
  project: Project
  status: boolean
  condition: Condition[]
  files: File[]
  total: number
  //iva: number
  __v: number
  id: string
  //report: string
  report: Report
  isticket: boolean
  iscard: boolean
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

export interface Vat {
  _id: string
  base: number
  value: number
  amount: number
  type: string
  status: boolean
  __v: number
  id: string
}

export interface Cost {
  subtotal: number
  discount: number
  iva: number
  vat: Vat
  vatvalue: number
  total: number
}