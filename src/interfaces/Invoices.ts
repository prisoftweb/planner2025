import { ClientBack } from "./Clients"
import { Company } from "./Companies"
import { Glossary } from "./Glossary"
import { UsrBack } from "./User"

export interface IInvoice {
  cost: {
    subtotal: number
    discount: number
    iva: number
    total: number
    vat: string
  }
  _id: string
  folio: string
  taxfolio: string
  date: string
  notes: string
  useCFDI: string
  paymentMethod: string
  paymentWay: string
  user: string
  company: string
  client: string
  estimate: string
  project: string
  condition: {
    glossary: string
    user: string
    status: boolean
    _id: string
    id: string
  }[]
  concepts: {
    priceConcepEstimate: {
      cost: number
      date: string
      user: string
    }
    conceptEstimate: string
    area: string
    section: string
    quantity: number
    amount: number
    date: string
    status: boolean
    _id: string
    id: string
  }[]
  status: boolean
  datets: string
  __v: number
  id: string
}

export interface IInvoiceTable {
  folio: string,
  usecfdi: string,
  methodpaid: string,
  formpaid: string,
  estimate: string,
  condition: Glossary
  fecha: string
  amount: number,
  id: string
  idEstimates: string
}

export interface IInvoiceByProject {
  _id: string
  folio: string
  taxfolio: string
  notes: string
  date: string
  cost: {
    subtotal: number
    iva: number
    total: number
    discount: number
  }
  // useCFDI: {
  //   _id: string
  //   name: string
  // }
  // paymentMethod: {
  //   _id: string
  //   name: string
  // }
  // paymentWay: {
  //   _id: string
  //   name: string
  // }
  useCFDI: string
  paymentMethod: string
  paymentWay: string
  estimate: {
    _id: string
    name: string
  }
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
  client: {
    _id: string
    name: string
    photo: string
  }
  company: {
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
      user: string
    }
    area: string
    section: string
    quantity: number
    amount: number
    date: string
    status: boolean
    _id: string
  }[]
  status: boolean
}

export interface ITotalInvoicesByProject {
  quantity: number
  totalBilled: number
  subtotalBilled: number
  ivaBilled: number
  project: string
}

export interface IInvoiceMin {
  _id: string
  folio: string
  taxfolio: string
  notes: string
  date: string
  cost: {
    subtotal: number
    iva: number
    total: number
    discount: number
  }
  useCFDI: string
  paymentMethod: string
  paymentWay: string
  estimate: {
    _id: string
    name: string
  }
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
  client: ClientBack
  company: Company
  condition: Glossary
  concepts: {
    conceptEstimate: string
    priceConcepEstimate: {
      cost: number
      date: string
      user: string
    }
    area: string
    section: string
    quantity: number
    amount: number
    date: string
    status: boolean
    _id: string
  }[]
  status: boolean
}

export interface IConceptInvoice {
  user: UsrBack
  conceptEstimate: {
    _id: string
    code: string
    name: string
    description: string
    quantity: number
    unit: {
      _id: string
      name: string
      color: string
    }
  }
  status: boolean
}

export interface ITotalInvoiceResumen {
  billedTotal: {
    quantity: number
    billedTotal: number
    subBilledTotal: number
    vatBilledTotal: number
    project: string
    amountotal: number
  }
  totalAccumulated: {
    quantity: number
    estimatedTotal: number
    amountGuaranteeFund: number
    amountChargeOff: number
    amountPayable: number
    amountPayableVAT: any
    pendingEstimate: number
  }
}