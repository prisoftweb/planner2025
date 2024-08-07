export interface CostsByConceptAndCategory {
  quantity: number
  subtotalCost: number
  totalCost: number
  totalIVA: number
  totalExemptTAX: number
  totalDiscount: number
  costocenter: Costocenter
}

export interface Costocenter {
  category?: string
  concept?: string
}

export interface CostsByDay {
  quantity: number
  subtotalCost: number
  totalCost: number
  totalIVA: number
  totalExemptTAX: number
  totalDiscount: number
  date: string
  day: number
}

export interface CostsGroupByResumen {
  _id: any
  quantity: number
  subtotalCost: number
  totalIVA: number
  totalDiscount: number
  totalCost: number
}

export interface CostsGroupResumenByType {
  _id: {
    type: string
  }
  quantity: number
  subtotalCost: number
  totalIVA: number
  totalDiscount: number
  totalCost: number
  tipo: string
}
