import { Client } from "./Clients"
import { UsrBack } from "./User"
import { Company } from "./Companies"

export interface ReportByProject {
  _id: Id
  quantity: number
  totalCost: number
  porcentaje: any
  project: Project
  cate: any[]
  isticket: string
  tipo: string
}

export interface Id {
  project: string
  type: string
}

export interface Project {
  costQuantity: number
  _id: string
  title: string
  code: string
  amount: number
  categorys: Categorys
  types: Types
  //user: User
  user: UsrBack
  company: Company
  client: Client
  account: string
  id: string
}

export interface Categorys {
  _id: string
  name: string
  status: boolean
  id: string
}

export interface Types {
  _id: string
  name: string
  status: boolean
  id: string
}

export interface CostGroupByType {
  _id: Id
  quantity: number
  totalCost: number
  totalIVA: number
  totalDiscount: number
  tipo: string
}

// export interface Id {
//   type: string
// }

// export interface User {
//   _id: string
//   name: string
//   email: string
//   photo: string
//   department: Department
//   rol: Rol
// }

// export interface Department {
//   _id: string
//   name: string
//   abbr: string
//   company: Company
//   id: string
// }

// export interface Company {
//   _id: string
//   name: string
//   logo: string
//   id: string
// }

// export interface Rol {
//   _id: string
//   name: string
//   description: string
// }

// export interface Company2 {
//   _id: string
//   name: string
//   logo: string
//   status: boolean
//   id: string
// }

// export interface Client {
//   _id: string
//   name: string
//   tradename: string
//   logo: string
//   contact: any[]
//   user: any
//   status: boolean
//   datets: string
//   id: string
// }
