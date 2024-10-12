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
}

export interface ProjectsNotCompleted {
  _id: string
  title: string
  amount: number
  estatus: string
}