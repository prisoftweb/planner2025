import { Concept } from "./Concepts"

export interface CostCenterTable {
  id: string
  code: number
  category: string
  status: boolean
  concept: string
}

export interface CostCenter {
  _id: string
  name: string
  isnormal: boolean
  icon: string
  code: number
  categorys: Category[]
  status: boolean
  __v: number
  id: string
}

export interface Category {
  concept: Concept
  _id: string
  id: string
}

export interface CostoCenterLV {
  categoryid: string
  categoryname: string
  value: string
  label: string
}

export interface ReportByCostcenter {
  quantity: number
  totalCost: number
  totalIVA: number
  totalDiscount: number
  type: string
  costocenter: CostocenterReport
  project: string
}

export interface CostocenterReport {
  category: string
  concept: string
  account: string
}

export interface ReportByCostcenterCategory {
  quantity: number
  totalCost: number
  totalIVA: number
  totalDiscount: number
  type: string
  costocenter: string
  project: string
}