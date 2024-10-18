export interface TotalAmountProjects {
  totalAmount: number
  projects: number
}

export interface ListProjects {
  _id: string
  title: string
  amount: number
  estatus: string
}

export interface ListProjectsByDate {
  _id: string
  title: string
  date: string
  amount: number
  estatus: string
  porcentage: number
  progress: number
}

export interface ProjectsByClient {
  quantity: number
  totalAmount: number
  porcentage: number
  client: string
}

export interface ProjectsBySegment {
  quantity: number
  totalAmount: number
  porcentage: number
  client: string
}

export interface ProjectsByStatus {
  quantity: number
  totalAmount: number
  porcentage: number
  client: string
}

export interface ProjectsByProgress {
  title: string
  totalAmount: number
  porcentage: number
  progress: number
}

export interface CostsByProjectAndType {
  quantity: number
  subtotalCost: number
  totalIVA: number
  totalDiscount: number
  project: string
  type: string
  porcentage: number
}

export interface ProjectsNotCompleted {
  _id: string
  title: string
  amount: number
  estatus: string
}

export interface ProjectsTop10 {
  _id: string
  title: string
  date: string
  amount: number
  estatus: string
  porcentage: number
  progress: number
}

export interface ProjectByBudgetedControl {
  _id: string
  title: string
  date: string
  estatus: string
  progress: number
  amountInfo: {
    amount: number
    porcentage: number
  }
  budgetedInfo: {
    budgeted: number
    porcentage: number
  }
  spentInfo: {
    spent: number
    porcentage: number
  }
}

export interface ProjectCostoCenters {
  quantity: number
  subtotalCost: number
  totalCost: number
  totalIVA: number
  totalExemptTAX: number
  totalDiscount: number
  amountPro: number
  porcentage: number
  costocenter: {
    concept: string
  }
}

export interface DashboardTotalCost {
  quantity: number
  subtotalCost: number
  totalCost: number
  totalIVA: number
  totalExempttax: number
  totalDiscount: number
}

export interface ConfigMin {
  _id: string
  version: string
  manager: string
  personofpettycash: string
  lastmeta: {
    amount: number
    year: number
    _id: string
  }
}

export interface ControlBudgeted {
  id: string
  title: string
  total: number
  porcentage: number
}

