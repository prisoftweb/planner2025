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
}