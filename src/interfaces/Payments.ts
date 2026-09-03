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
  paymentplugin: {
    plugin: number,
    date: string,
    notes: string,
  }
  methodofpayment: {
    _id: string,
    name: string,
    color: string,
    darktext:boolean
  }
  condition: {
    _id: string,
    name: string,
    color: string,
    darktext:boolean
  }
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
  user: UsrBack,
  // costos: {
  //   costito: number
  // }
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
    paymentelements: 4,
    pay: [
        {
            paid: string,
            previousbalanceamount: number,
            payout: number,
            unpaidbalanceamount: number,
            partialitynumber: number,
            _id: string
        }
    ]
    estatus: Glossary
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
    // estatus: Glossary
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
  methodofpayment: string | Glossary
  status: boolean
  __v: number
  id: string
  paymentplugin: {
    plugin: number,
    date: string,
    notes: string
  }
}

export interface pendingPaymentProvider {
  provider: {
    _id: string
    tradename: string
  }
  totalPendingPayment: number
}

export interface CostInPayment {
  cost: string
  previousbalanceamount: number
  payout: number
  unpaidbalanceamount: number
  partialitynumber: number
  paymentelements: number
  // payment: PaymentOfCost[]
}

export interface IPaymentResumeProvider {
  _id: string
  reference: string
  paymentplugin: {
    plugin: number
    date: string
    notes: string
  }
  payout: number
  pending: number
  date: string
  notes: string
  voucher: string
  provider: {
    _id: string
    name: string
  }
  methodofpayment: {
    _id: string
    name: string
    color: string
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  condition: {
    _id: string
    name: string
    color: string
    darktext: boolean
  }
  quantity: string[]
  status: boolean
}

export interface IPendingPaymentResumeProviderPDF {
  folio: string
  date: string
  expiredDate: string
  daysExpired: number
  ispaid: boolean
  paymentelements: number
  provider: {
    _id: string
    name: string
    today: string
    creditdays: number
  }
  costocenter: {
    _id: string
    category: string
    concept: {
      _id: string
      name: string
    }
  }
  estatus: {
    _id: string
    name: string
    color: string
  }
  groupTitleExpirationDays: string
  groupExpirationDays: {
    vigente: number
    days0_30: number
    days30_45: number
    days45_60: number
    days60plus: number
    show?: number
  }
  totalAcum: number
}

export interface ITotalAcumulatedPendingPaymentResumeProviderPDF {
  debttosupplier: string
  quantity: number
  deferred: number
  amountotal: number
  unpaidbalanceamount: number
  payout: number
}
