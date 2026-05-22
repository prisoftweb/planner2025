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
  // condition: Glossary
  condition: {
    _id: string
    name: string
    color: string
    darktext:boolean
  }
  fecha: string
  amount: number,
  id: string
  idEstimates: string,
  charged:number,
  unchargedbalanceamount: number
  previousBalance:number
  accountreceivablesCount:number
  ischargedfull:boolean
  project?: string
  nameProject?: string
  client?: string
  subtotal?:number,
  vat?:number,
  uuid:string
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
  lastpayment:{
    accountreceivable: string,
    charged: number,
    partialitynumber: number
    previousbalanceamount: number
    unchargedbalanceamount: number
    _id: string
  }
  ischargedfull: boolean
  fullyCharged: number
  accountreceivablesCount: number
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
  // condition: Glossary
  condition: {
    _id: string,
    name: string,
    color: string
    darktext:boolean
  }
  concepts: {
    conceptEstimate: {
      _id: string
      code: string
      name: string
      description: string
      unit: {
        _id: string
        name: string
        color: string
      }
    }
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
  accountreceivables:{
    accountreceivable: string,
    charged: number,
    partialitynumber: number
    previousbalanceamount: number
    unchargedbalanceamount: number
    _id: string
  }[]
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
  accountreceivablesCount: number
  ischargedfull: boolean
  lastpayment:{
    accountreceivable: string,
    charged: number,
    partialitynumber: number
    previousbalanceamount: number
    unchargedbalanceamount: number
    _id: string
  },
  accountreceivables:{
    accountreceivable: string,
    charged: number,
    partialitynumber: number
    previousbalanceamount: number
    unchargedbalanceamount: number
    _id: string
  }[]
}

export interface IInvoiceMinFull {
  _id: string
  folio: string
  taxfolio: string
  notes: string
  date: string
  cost: {
    subtotal: number
    iva: number
    total: number
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
  client: {
    _id: string
    tradename: string
    name: string
    rfc: string
    phone: string
    location: {
      country: string
      municipy: string
      stret: string
      cp: number
      community: string
      state: string
    }
  }
  company: {
    _id: string
    name: string
    logo: string
  }
  condition: {
    _id: string
    name: string
    color: string
  }
  lastpayment: {
    accountreceivable: string
    previousbalanceamount: number
    charged: number
    unchargedbalanceamount: number
    partialitynumber: number
    _id: string
  }
  ischargedfull: boolean
  accountreceivablesCount: number
  conceptsInvoiceInfo: {
    conceptEstimate: {
      _id: string
      code: string
      name: string
      description: string
      unit: {
        _id: string
        name: string
        color: string
      }
    }
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

export interface ICollectiosByInvoice {
  _id: string
  charged: number
  previousbalanceamount: number
  partialitynumber: number
  accountReceivable: {
    _id: string
    reference: string
    concept: string
    date: string
    amount: number
    voucher: string
    user: {
      _id: string
      name: string
      photo: string
    }
  }
}

export interface IInvoiceCollectionsTable {
  id:string,
  reference: string,
  amount: number,
  charged: number,
  concept: string
}

export interface IConceptsInvoice {
  user: {}
  conceptEstimate: {
    _id: string
    code: string
    name: string
    description: string
    unit: {
      _id: string
      name: string
      color: string
    }
  }
  idconcept: string
  area: string
  section: string
  priceConcepEstimate: {
    cost: number
    date: string
    user: string
  }
  quantity: number
  amount: number
  date: string
  status: boolean
}

export interface ITotalAmountInvoicesPending {
  totalInvoiceIssued: {
    quantity: number
    total: number
  }
  totalInvoiceOverdue: {
    quantity: number
    total: number
  }
  totalInvoicesPayment: {
    quantity: number
    total: number
  }
}

export interface IInvoiceByDateAndConditionMin {
  _id: string
  folio: string
  taxfolio: string
  notes: string
  date: string
  count: number
  cost: {
    subtotal: number
    iva: number
    total: number
  }
  paymentMethod: string
  paymentWay: string
  useCFDI: string
  ischargedfull: boolean
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
    tradename: string
    name: string
    rfc: string
    email: string
    phone: string
    location: {
      stret: string
      cp: number
      community: string
      municipy: string
      state: string
      country: string
      type: string
      coordinates: any[]
    }
  }
  termsofPayment: {
    _id: string
    name: string
    color: string
  }
  duedate: string
  company: {
    _id: string
    name: string
    logo: string
  }
  condition: {
    _id: string
    name: string
    color: string
    darktext:boolean
  }
  accountreceivables: any[]
  accountreceivablesCount: number
  status: boolean
  fullyCharged?: number
}


export interface ITotalInvoicesByProjectDashboardCollection {
  project: string
  quantity: number
  // totalBilled: number
  // subtotalBilled: number
  // ivaBilled: number
  fullyCharged: number
}

export interface ITotalInvoiceByClient {
  client: string
  quantity: number
  fullyCharged: number
}

export interface ITotalPaymentByDateAndStatus {
  quantity: number
  total: number
}

export interface ITotalPendingByDateAndStatus {
  quantity: number
  total: number
}

export interface ITotalAccountReceivablesByProjectResumen {
  project: string
  quantity: number
  type: string
  pendingPayment: number
}

export interface ITotalAccountReceivablesByClientResumen {
  client: string
  quantity: number
  type: string
  pendingPayment: number
  // pendingBilling: number
}

export interface ITotalEstimatesPendingByProject {
  project: string
  quantity: number
  type: string
  pendingEstimated: number
}

export interface ITotalEstimatesPendingByClient {
  client: string
  quantity: number
  c: string
  type: string
  pendingEstimated: number
}

export interface IAllsProjectsMINAndNEConditionANDNoExistsEstimate {
  _id: string
  project: string
  pendingPayment: number
  type: string
}

// export interface IAllTOTALPENDINGPAYMENTSByProject {
//   project: string
//   pendingPayment: number
//   porcentagePending: number
//   pendingBilling: number
// }
export interface IAllTOTALPENDINGPAYMENTSByProject {
  project: string
  date: string
  client: string
  type: string
  pendingBilling: number
  pendingPayment: number
  pendingTotal: number
  porcentagePendingPAY: number
}

export interface IAllTOTALPENDINGBillingByProject {
  quantity: number
  acumPendingBilling: number
}

export interface IInvoiceFull {
  cost: {
    subtotal: number
    iva: number
    total: number
  }
  sat: {
    invoiceId: string
    createdAt: string
    invoiceSignatureDate: string
    invoiceCertificateNumber: string
    satCertificateNumber: string
    invoiceBase64Sello: string
    satBase64Sello: string
    satBase64OriginalString: string
    invoiceBase64QrCode: string
  }
  _id: string
  folio: string
  taxfolio: string
  date: string
  useCFDI: string
  paymentWay: string
  paymentMethod: string
  purchaseorder: string
  termsofpayment: string
  ischargedfull: boolean
  isinvoiceSAT: boolean
  user: string
  company: string
  client: string
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
  accountreceivables: {
    previousbalanceamount: number
    charged: number
    unchargedbalanceamount: number
    partialitynumber: number
    _id: string
    id: string
  }[]
  status: boolean
  datets: string
  __v: number
  id: string
  typeofreceipts?:string
}
