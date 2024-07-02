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
  Importe: string
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
  subtotal: number
  lastmove: Lastmove
  department: string
}

export interface User {
  name: string
  photo: string
}

// export interface Company {
//   _id: string
//   name: string
//   logo: string
// }

// export interface Project {
//   _id: string
//   title: string
// }

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

// export interface Department {
//   _id: string
//   name: string
// }