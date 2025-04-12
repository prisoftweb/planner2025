import { Glossary } from "./Glossary"

export interface ICollection {
  _id: string
  reference: string
  concept: string
  amount: number
  date: string
  counter: number
  voucher: string
  ischarged: boolean
  user: string
  company: string
  client: string
  invoices: {
    project: string
    amountcharged: number
    invoice: string
    _id: string
    id: string
  }[]
  condition: {
    glossary: string
    date: string
    user: string
    status: boolean
    _id: string
    id: string
  }[]
  status: boolean
  datets: string
  account: string
  __v: number
  id: string
}

// export interface ICollectionMin {
//   _id: string
//   reference: string
//   concept: string
//   amount: number
//   date: string
//   account: string
//   voucher: string
//   invoices: {
//     _id: string
//     amountcharged: number
//     project: {
//       _id: string
//       title: string
//     }
//     invoices: {
//       _id: string
//       folio: string
//       taxfolio: string
//       date: string
//       cost: {
//         subtotal: number
//         iva: number
//         total: number
//       }
//     }
//   }
//   company: {
//     _id: string
//     name: string
//     logo: string
//   }
//   user: {
//     _id: string
//     name: string
//     photo: string
//   }
//   client: {
//     _id: string
//     name: string
//   }
//   condition: {
//     _id: string
//     name: string
//     color: string
//   }
// }

export interface ICollectionMin {
  _id: string
  reference: string
  concept: string
  amount: number
  date: string
  account: string
  voucher: string
  invoices: {
    _id: string
    amountcharged: number
    project: {
      _id: string
      title: string
    }
    invoices: {
      _id: string
      folio: string
      taxfolio: string
      date: string
      cost: {
        subtotal: number
        iva: number
        total: number
      }
    }
  }
  company: {
    _id: string
    name: string
    logo: string
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  client: {
    _id: string
    name: string
  }
  condition: {
    _id: string
    name: string
    color: string
  }
}

export interface IOneCollectionMin {
  _id: string
  reference: string
  concept: string
  amount: number
  date: string
  voucher: string
  user: {
    _id: string
    name: string
    photo: string
  }
  company: {
    _id: string
    name: string
    logo: string
  }
  client: {
    _id: string
    name: string
  }
  invoices: {
    project: string
    amountcharged: number
    invoice: string
    _id: string
  }[]
  condition: {
    _id: string
    name: string
    color: string
  }[]
  account: string
}

export interface ITableCollection {
  id:string
  Accion: string 
  Referencia: string 
  Fecha: string 
  Cuenta: string
  Estimacion:  string
  Facturas: {
    _id: string
    amountcharged: number
    project: {
      _id: string
      title: string
    }
    invoices: {
      _id: string
      folio: string
      taxfolio: string
      date: string
      cost: {
        subtotal: number
        iva: number
        total: number
      }
    }
  }[],
  status: {
    _id: string
    name: string
    color: string
  }, 
  Importe: number
  concept: string
}

export interface ITotalResumentPayment {
  billedTotal: {
    quantity: number
    billedTotal: number
    subBilledTotal: number
    vatBilledTotal: number
    project: string
    amountotal: number
    pendingBillingTotal: number
  }
  totalPayments: {
    quantity: number
    totalPayments: number
    pendingPaymentTotal: number
  }
}

export interface IInvoicesByCollection {
  _id: string
  reference: string
  status: boolean
  paymentInInvoice: {
    invoice: string
    folio: string
    taxfolio: string
    total: number
    ischargedfull: boolean
    project: string
    pay: {
      accountreceivable: string
      previousbalanceamount: number
      charged: number
      unchargedbalanceamount: number
      partialitynumber: number
      _id: string
    }[]
    itemscharged: number
  }
}

// export interface Root {
//   _id: string
//   reference: string
//   status: boolean
//   paymentInInvoice: {
//     invoice: string
//     folio: string
//     taxfolio: string
//     total: number
//     ischargedfull: boolean
//     project: string
//     pay: {
//       accountreceivable: string
//       previousbalanceamount: number
//       charged: number
//       unchargedbalanceamount: number
//       partialitynumber: number
//       _id: string
//     }[]
//     itemscharged: number
//   }
// }
