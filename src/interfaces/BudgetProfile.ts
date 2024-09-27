import { UsrBack } from "./User"
import { Company } from "./Companies"
import { Glossary } from "./Glossary"
import { Project } from "./Projects"

export interface FullBudget {
  _id: string
  title: string
  description: string
  date: string
  counter: number
  budgeted: number
  pending: number
  amount: number
  conditionStatus: string
  condition: Condition[]
  progressAverage: number
  user: UsrBack
  company: Company
  project: Project
  status: boolean
  datets: string
  newbudget: Newbudget[]
  account: string
  __v: number
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

export interface Type {
  _id: string
  name: string
}

export interface Newbudget {
  costocenter: Costocenter
  cost: number
  percent: number
  date: string
  user: string
  status: boolean
  _id: string
  id: string
}

export interface Costocenter {
  category: CategoryBudget
  concept: ConceptBudget
}

export interface CategoryBudget {
  _id: string
  name: string
  icon: string
  code: number
  id: string
}

export interface ConceptBudget {
  _id: string
  name: string
  status: boolean
  id: string
}


// export interface FullBudgetMin {
//   _id: string
//   user: UsrBack
//   company: Company
//   project: Project
//   lastmove: Lastmove
//   title: string
//   description: string
//   date: string
//   account: string
//   budgeted: number
//   pending: number
//   amount: number
//   budget: Budget
//   status: boolean
// }

// export interface Lastmove {
//   date: string
//   condition: Glossary
// }

// export interface Budget {
//   cost: number
//   percent: number
//   date: string
//   costocenter: Costocenter
// }

// export interface Costocenter {
//   _id: string
//   category: string
//   concept: Concept
// }

// export interface Concept {
//   _id: string
//   namefull: string
// }