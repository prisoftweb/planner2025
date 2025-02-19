import { Glossary } from "./Glossary"
import { UsrBack } from "./User"

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
  amountVat: number
  haveInvoice: boolean
}

export interface IEstimateProject {
  _id: string
  name: string
  description: string
  date: string
  amountGuaranteeFund: number
  amountChargeOff: number
  amount: number
  amountPayable: number,
  amountPayableVAT: number
  ismoneyadvance: boolean
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
  estimatedTotal: number,
  condition: Glossary,
  haveinvoice: boolean
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
  estimatedTotal: number,
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

export interface IConceptEstimateNormal {
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

export interface IConceptEstimate {
  user: UsrBack
  conceptEstimate: {
    _id: string
    code: string
    name: string
    description: string
    unit: Glossary
    area: string
    section: string
    priceConcepEstimate: {
      cost: number
      date: string
    }
    quantity: number
    amount: number
    date: string
  }
  status: boolean
}

export interface IEstimateMin {
  _id: string
  name: string
  description: string
  date: string
  amountGuaranteeFund: number
  amountChargeOff: number
  amount: number
  amountPayable: number
  amountPayableVAT: number
  purschaseOrder: string
  estimatedTotal: number
  ismoneyadvance: boolean
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
  condition: Glossary
  concepts: {
    conceptEstimate: string
    priceConcepEstimate: {
      cost: number
      date: string
    }
    area: string
    section: string
    quantity: number
    amount: number
    date: string
    user: string
    status: boolean
    _id: string
  }[]
  status: boolean
}

export interface PriceConcept {
  user: UsrBack
  cost: number
  date: string
  status: boolean
}

export interface TotalEstimatedByProject {
  quantity: number
  estimatedTotal: number
  amountGuaranteeFund: number
  amountChargeOff: number
  amountPayable: number
  project: string
}

export interface ResumenEstimateProject {
  totalAccumulated: {
    quantity: number
    estimatedTotal: number
    amountGuaranteeFund: number
    amountChargeOff: number
    amountPayable: number
    amountPayableVAT: number
  }
  totalPrevious: {
    _id: string
    estimatedTotal: number
    amountGuaranteeFund: number
    amountChargeOff: number
    amountPayable: number
    amountPayableVAT: number
  }
  totalActual: {
    _id: string
    estimatedTotal: any
    amountGuaranteeFund: number
    amountChargeOff: number
    amountPayable: number
    amountPayableVAT: number
  }
  estimateResume: {
    _id: string
    name: string
    description: string
    date: string
    amountGuaranteeFund: number
    amountChargeOff: number
    amount: number
    amountPayable: number
    amountPayableVAT: number
    purschaseOrder: string
    estimatedTotal: number
    ismoneyadvance: boolean
    condition: Glossary
    concepts: any[]
    project: {
      _id: string
      title: string
      photo: string
    }
    user: UsrBack
    status: boolean
    estimatedTotalVAT:number
  }
}
