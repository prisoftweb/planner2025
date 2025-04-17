import { UsrBack } from "./User"
import { Company } from "./Companies"
import { ClientBack } from "./Clients"
import { Glossary } from "./Glossary"

export interface ProjectsTable{
  id: string,
  code: string, 
  project:string,
  imgProject: string,
  //status:boolean, 
  condition: string,
  category:string, 
  client:string, 
  date:string,
  // amount:string,
  amount:number
  percentage: string
  account: string
  // total: string
  total: number
}

export interface ProjectsBudgetTable{
  id: string,
  percentage: string
  project:{
    budget: string
    project: string
  },
  status: boolean
  segment: string
  // amountBudget:string,
  // pending:string,
  // budgeted: string,
  amountBudget:number,
  pending:number,
  budgeted: number,
  color: string  
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
  hasamountChargeOff: boolean
  amountChargeOff: {
    date: string,
    amount: number,
    porcentage: number
  }
}

export interface OneProjectMin {
  _id: string
  description: string
  location: Location
  guaranteefund: Guaranteefund
  company: Company
  client: ClientBack
  category: Glossary
  title: string
  code: string
  amount: number
  date: string
  photo: string
  account: string
  hasguaranteefund: boolean
  type: Glossary
  segment: Glossary
  progress: number
  status: boolean
  hasamountChargeOff: boolean
  amountChargeOff: {
    date: string,
    amount: number,
    porcentage: number
  }
}

// export interface ProjectMin {
//   _id: string
//   title: string
//   code: string
//   amount: number
//   date: string
//   photo: string
//   account: string
//   hasguaranteefund: boolean
//   client: ClientBack
//   company: Company
//   type: Glossary
//   segment: Glossary
//   category: Glossary
//   progress: number
//   status: boolean
// }

export interface ProjectMin {
  _id: string
  title: string
  code: string
  date: string
  amount: number
  photo: string
  hasguaranteefund: boolean
  company: Company
  client: ClientBack
  status: boolean
  account: string
  // category: Category
  // type: Type
  // segment: Segment
  category: Glossary
  type: Glossary
  segment: Glossary
  progress: number
  amountotal: number
  amountChargeOff?: {
    date: string
    porcentage: number,
    amount: number
  }
  guaranteefund: {
    date: string
    porcentage: number,
    amount: number
  }
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

export interface ITimeLineProject {
  _id: string
  conditionstatus: {
    _id: string
    condition: {
      _id: string
      name: string
      color: string
    }
    user: {
      _id: string
      name: string
      photo: string
    }
    date: string
    status: boolean
  }
}

export interface IProjectWithEstimateMin {
  _id: string
  title: string
  amountPayable: number
  amountPayableVAT: number
  account: string
  amount: number
  amountotal: number
  porcentage: number
  estimates: number
  client: string
  projectInfoStatusInfo: {
    _id: string
    name: string
    description: string
    color: string
    status: boolean
    __v: number
  }
}

export interface ICostsByProject {
  _id: string
  folio: string
  taxfolio: string
  description: string
  date: string
  taxapply: boolean
  isticket: boolean
  ispaid: boolean
  iscard: boolean
  cost: {
    subtotal: number
    iva: number
    total: number
    discount: any
    exempttax: any
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  project: {
    _id: string
    title: string
  }
  report: {
    _id: string
    name: string
  }
  provider: {
    _id: string
    name: string
  }
  costocenter: {
    _id: string
    category: string
    concept: {
      _id: string
      name: string
    }
  }
  typeCFDI: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
  }
  files: {
    file: string
    types: string
    _id: string
  }[]
  estatus: {
    _id: string
    name: string
    color: string
  }
  status: boolean
}

export interface IBudgetByProject {
  _id: string
  user: {
    _id: string
    name: string
    photo: string
  }
  project: {
    _id: string
    title: string
    photo: string
  }
  title: string
  description: string
  date: string
  account: string
  budgeted: number
  pending: number
  amount: number
  conditionStatus: string
  progressAverage: number
  company: {
    _id: string
    name: string
    logo: string
  }
  costocenter: {
    _id: string
    category: string
    concept: {
      _id: string
      name: string
      namefull: string
    }
  }
  status: boolean
}
