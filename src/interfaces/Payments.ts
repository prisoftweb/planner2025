import { UsrBack } from "./User"
import { Provider } from "./Providers"
import { Glossary } from "./Glossary"
import { Expense } from "./Expenses"

export interface Payment {
  _id: string
  reference: string
  payout: number
  pending: number
  date: string
  notes: string
  voucher: string
  costs: string[]
  user: string
  provider: string
  status: boolean
  __v: number
  id: string
}

export interface PaymentProvider {
  _id: string
  reference: string
  payout: number
  pending: number
  date: string
  notes: string
  voucher: string
  provider: Provider
  user: UsrBack
  quantity: string[]
  status: boolean
}

export interface CostPayment {
  _id: string
  reference: string
  payout: number
  pending: number
  date: string
  notes: string
  voucher: string
  provider: Provider
  user: UsrBack
  costs: {
    folio: string
    taxfolio: string
    cost: {
      subtotal: number
      discount: any
      exempttax: any
      iva: number
      total: number
      vat: string
    }
    description: string
    taxapply: boolean
    isticket: boolean
    ispaid: boolean
    iscard: boolean
    scattered: boolean
    date: string
    type: string
    project: {
      _id: string
      title: string
    }
    user: UsrBack
    report: {
      _id: string
      name: string
    }
    typeCFDI: {
      _id: string
      name: string
    }
    category: {
      _id: string
      name: string
    }
    estatus: Glossary
    costocenter: {
      _id: string
      category: string
      concept: {
        _id: string
        name: string
      }
    }
    files: File[]
  }
  status: boolean
}

export interface File {
  file: string
  types: string
  _id: string
}


//////////////////////////
export interface OnePayment {
  _id: string
  reference: string
  payout: number
  pending: number
  date: string
  notes: string
  voucher: string
  costs: Expense[]
  user: UsrBack
  provider: Provider
  status: boolean
  __v: number
  id: string
}

export interface pendingPaymentProvider {
  provider: {
    _id: string
    tradename: string
  }
  totalPendingPayment: number
}

