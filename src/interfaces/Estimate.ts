import { Glossary } from "./Glossary"

export interface TableEstimatesProject {
  id: string,
  No: number, 
  Nombre: string, 
  Estimacion: number, 
  Amortizacion: number, 
  Fondo: number, 
  MontoPay: number, 
  Condicion: Glossary, 
  Fecha: string, 
  Orden: string
}

export interface IEstimateProject {
  _id: string
  name: string
  description: string
  date: string
  amountGuaranteeFund: number
  amountChargeOff: number
  amount: number
  amountPayable: number
  project: {
    _id: string
    title: string
    photo: string
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  status: boolean
  purschaseOrder: string
}

export interface IEstimate {
  _id: string
  name: string
  description: string
  date: string
  amount: number
  amountGuaranteeFund: number
  amountChargeOff: number
  amountPayable: number
  condition: {
    glossary: string
    date: string
    user: string
    status: boolean
    _id: string
    id: string
  }[]
  user: string
  company: string
  project: string
  status: boolean
  datets: string
  __v: number
  id: string,
  purschaseOrder: string
}

export interface ITableConceptsEstimate {
  id: string,
  Clave: string, 
  nombre: string, 
  Descripcion: string, 
  Unidad: string, 
  Cantidad: number, 
  PU: number, 
  Importe: number
}

export interface IConceptEstimate {
  _id: string
  code: string
  name: string
  description: string
  status?: boolean
  datets?: string
  prices?: {
    cost: number
    date: string
    unit: string
    user: string
    status: boolean
    _id: string
    id: string
  }[]
  __v?: number
  id?: string
}
