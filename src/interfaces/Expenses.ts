import { Glossary } from "./Glossary"
import { UsrBack } from "./User"
import { Provider } from "./Providers"
import { CostCenter } from "./CostCenter"
import { Project } from "./Projects"
import { Report } from "./Reports"
import { Concept } from "./Concepts"

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
  taxFolio: string
  color: string
}

// export interface Expense {
//   cost: Cost
//   _id: string
//   folio: string
//   taxfolio: string
//   description: string
//   date: string
//   taxapply: boolean
//   ispaid: boolean
//   category: Glossary
//   typeCFDI: Glossary
//   user: UsrBack
//   provider: Provider
//   costocenter:(string | CostCenter)
//   project: Project
//   status: boolean
//   condition: Condition[]
//   files: File[]
//   total: number
//   __v: number
//   id: string
//   report: Report
//   isticket: boolean
//   iscard: boolean
// }

export interface Expense {
  _id: string
  folio: string
  taxfolio: string
  description: string
  date: string
  taxapply: boolean
  isticket: boolean
  ispaid: boolean
  cost: Cost
  user: UsrBack
  project: Project
  report: Report
  provider: Provider
  costocenter: Costocenter
  typeCFDI: Glossary
  category: Glossary
  estatus: Glossary
  status: boolean
  iscard: boolean
  files: File[]
}

export interface OneExpense {
  _id: string
  folio: string
  taxfolio: string
  description: string
  date: string
  taxapply: boolean
  isticket: boolean
  ispaid: boolean
  cost: Cost
  user: UsrBack
  project: Project
  report: Report
  provider: Provider
  costocenter: OneCostocenter
  typeCFDI: Glossary
  category: Glossary
  estatus: Glossary
  status: boolean
  iscard: boolean
  files: File[]
}

export interface OneCategory {
  _id: string
  name: string
  code: number
  categorys: ListCategory[]
  status: boolean
  id: string
}

export interface ListCategory {
  concept: Concept
  id: any
}

export interface Costocenter {
  _id: string
  category: string
  concept: Concept
}

export interface OneCostocenter {
  _id: string
  category: OneCategory
  concept: Concept
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
  exempttax: number
}