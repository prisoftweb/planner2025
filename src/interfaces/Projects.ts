import { UserBack } from "./User"
import { Company } from "./Companies"
import { Client } from "./Clients"

export interface ProjectsTable{
  id: string,
  code: string, 
  project:string,
  status:boolean, 
  category:string, 
  client:string, 
  date:string,
  amount:string
}

export interface Project {
  location: Location
  guaranteefund: Guaranteefund
  _id: string
  title: string
  code: string
  description: string
  date: string
  counter: number
  amount: number
  photo: string
  haslocation: boolean
  hasguaranteefund: boolean
  user: UserBack
  company: Company
  client: Client
  status: boolean
  datets: string
  condition: any[]
  progress: any[]
  account: string
  __v: number
  id: string
}

export interface Location {
  cp: any
  community: string
  municipy: string
  state: string
  country: string
  type: string
  coordinates: any[]
}

export interface Guaranteefund {
  date: string
}