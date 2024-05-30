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
  __v: number
  id: string
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