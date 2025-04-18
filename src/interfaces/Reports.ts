import { Department } from "./Departments"
import { Company } from "./Companies"
import { Project } from "./Projects"
import { UsrBack } from "./User"
import { Glossary } from "./Glossary"

export interface ReportTable{
  id: string
  Responsible: string 
  Report: string 
  Project: string
  Company: string
  Depto: string 
  Status: string 
  NºGastos: string 
  Total: string 
  Fecha: string
  color:string
  account: string
  isPettyCash: boolean
}

export interface Report {
  _id: string
  name: string
  comment: string
  date: string
  counter: number
  moves: Mfe[]
  user: UsrBack
  company: Company
  department: Department
  project: Project
  status: boolean
  account: string
  total: number
  __v: number
  id: string
  ispettycash: boolean
  quantity: number
  wached: boolean
  ammount: number
  expirationdate: string
}

export interface Mfe {
  condition: Glossary
  notes: string
  user: UsrBack
  department: Department
  status: boolean
  _id: string
  id: string
}

export interface CostsTable {
  id: string
  Responsable: {
    responsible: string,
    photo: string
  } 
  Proyecto: string 
  Descripcion: string 
  Proveedor: string 
  Estatus: string 
  Fecha: string 
  Total: string
  condition: string
}

// export interface ReportParse {
//   _id: string
//   name: string
//   ispettycash: boolean
//   date: string
//   status: boolean
//   account: string
//   quantity: number
//   total: number
//   subtotal: number
//   company: string
//   companylogo: string
//   department: string
//   user: string
//   userphoto: string
//   lastmovedate: string
//   lastmovestatus: string
//   lastmovecolor: string
//   project: Project
// }

export interface ReportParse {
  _id: string
  name: string
  ispettycash: boolean
  date: string
  user: User
  company: Company
  project: Project
  status: boolean
  account: string
  quantity: number
  total: number
  totalok: number
  subtotal: number
  lastmove: Lastmove
  department: string
  expirationdate: string
}

export interface User {
  name: string
  photo: string
}

export interface Lastmove {
  condition: Condition
  department: Department
  date: string
}

export interface Condition {
  _id: string
  name: string
  color: string
}

export interface CostReport {
  _id: string
  folio: string
  taxfolio: string
  description: string
  date: string
  taxapply: boolean
  isticket: boolean
  ispaid: boolean
  user: User
  project: Project
  report: Report
  status: boolean
  cost: Cost
  costocenter: {
    concept: {
      _id: string
      name: string
    }
    _id: string
    category: string
  }
  iscard: boolean
  provider: {
    _id: string
    name: string
  }
  costo: {
    total: number
  }
  estatus: Glossary
}

export interface Cost {
  subtotal: number
  discount: number
  iva: number
  vatvalue: number
  vat: string
}

export interface ReportMin {
  _id: string
  name: string
  comment: string
  total: number
  subtotal: number
  quantity: number
  ispettycash: boolean
  date: string
  user: User
  company: Company
  project: Project
  status: boolean
  account: string
  wached: boolean
  lastmove: Lastmove
  departmentid: string
  department: string
}

export interface DateReport {
  _id: any
  maxDate: string
  minDate: string
}
