import { Glossary } from "./Glossary"

export interface TotalCostsByProvidersTradeLine {
  quantity: number
  totalCost: number
  subtotalCost: number
  totalIVA: number
  totalDiscount: number
}

export interface ProviderWithTradeLine {
  _id: string
  name: string
  tradename: string
  rfc: string
  tradeline: {
    creditdays: number
    creditlimit: number
    currentbalance: number
    percentoverduedebt: number
  }
  account: string
  estatus: Glossary
}

export interface CostsByProvider {
  quantity: number
  totalCost: number
  subtotalCost: number
  totalIVA: number
  totalDiscount: number
  provider: string
  account: string
  rfc: string
}

export interface TableDashboardProviders {
  id: string,
  name: string,
  rfc: string,
  status: Glossary
  account: string,
  currentBalance: number
}