import { Concept } from "./Concepts"

export interface CostCenterTable {
  id: string
  code: number
  category: string
  status: boolean
  concept: string
}

// export interface CostCenter {
//   _id: string
//   name: string
//   isnormal: boolean
//   code: number
//   categorys: Concept[]
//   status: boolean
//   __v: number
//   id: string
// }

// export interface Concept {
//   name: string
//   account: string
//   status: boolean
//   _id: string
//   id: string
// }

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