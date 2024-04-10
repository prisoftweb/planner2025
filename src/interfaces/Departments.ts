import { Company } from "./Companies"

export interface Department {
  _id: string
  name: string
  company: Company
  status: boolean
  __v: number
  id: string
  abbr?: string
}

export interface DepartmentTable {
  id: string
  name: string
  company: {
    logo: string,
    id: string
  }
  abbreviation: string
}