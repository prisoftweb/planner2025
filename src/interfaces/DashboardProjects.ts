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