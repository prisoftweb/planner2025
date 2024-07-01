import { UsrBack } from "./User"
import { Company } from "./Companies"
import { ClientBack } from "./Clients"
import { Glossary } from "./Glossary"

export interface ProjectsTable{
  id: string,
  code: string, 
  project:string,
  //status:boolean, 
  condition: string,
  category:string, 
  client:string, 
  date:string,
  amount:string,
  percentage: string
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
  user: UsrBack
  company: Company
  client: ClientBack
  status: boolean
  datets: string
  condition: Condition[]
  progress: Progress[]
  account: string
  __v: number
  id: string
  glossary: Glossary
  category: Glossary
  // types: Glossary
  // categorys: Glossary
}

export interface Location {
  cp: number
  community: string
  municipy: string
  state: string
  country: string
  type: string
  coordinates: any[],
  stret: string
}

export interface Guaranteefund {
  date: string
  porcentage: string
  amount: string
}

export interface Progress {
  progress: number
  date: string
  notes: string
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