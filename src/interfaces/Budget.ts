export interface BudgetMin {
  _id: string
  user: User
  company: Company
  project: Project
  lastmove: Lastmove
  title: string
  description: string
  date: string
  account: string
  budgeted: number
  pending: number
  amount: number
  status: boolean
}

export interface User {
  _id: string
  name: string
  photo: string
}

export interface Company {
  _id: string
  name: string
  logo: string
}

export interface Project {
  _id: string
  title: string
  photo: string
}

export interface Lastmove {
  date: string
  condition: Condition
}

export interface Condition {
  _id: string
  name: string
  color: string
}

export interface BudgetTableCostCenter{
  id: string,
  percentage: string
  category: string
  concept: string
  amount:string
}