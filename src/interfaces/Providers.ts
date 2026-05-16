import { Contact } from "./Common"
import { Glossary } from "./Glossary"
import { UsrBack } from "./User"

export interface Provider {
  "_id":string,
  "name":string,
  "tradename"?: string,
  "rfc":string,
  "account":string,
  "email"?:string,
  "phone"?:string,
  "suppliercredit":boolean,
  // 
  "tradeline": Tradeline,
  "contact"?:Contact[],
  "user"?:string,
  "status"?:boolean,
  condition: [{
    glossary: string | Glossary
    user: string
    status: boolean
    _id: string
    id: string
  }],
  company?: string
}

export interface ProviderMin {
  _id: string
  name: string
  tradename: string
  rfc: string
  suppliercredit: boolean
  tradeline: Tradeline
  user: UsrBack
  account: string
  estatus: Glossary
}

// export interface Root {
//   _id: string
//   name: string
//   tradename: string
//   rfc: string
//   suppliercredit: boolean
//   tradeline: {
//     overduedebt: boolean
//     date: string
//     creditdays: number
//     creditlimit: number
//     currentbalance: number
//     percentoverduedebt: number
//   }
//   user: {
//     _id: string
//     name: string
//     photo: string
//   }
//   account: string
//   estatus: {
//     _id: string
//     name: string
//     color: string
//     darktext: boolean
//   }
// }


export interface TableProvider{
  "id": string,
  "name":string,
  tradename: string,
  "suppliercredit": boolean,
  "rfc": string,
  "account"?:string,
  "currentbalance"?: string,
  'contacts': number,
}

export interface Tradeline{
  "creditdays"?:number,
  "creditlimit"?:number,
  "currentbalance"?:number,
  "overduedebt"?:boolean,
  "percentoverduedebt"?:number,
  "date"?:Date
}

export interface HistoryExpensesTable {
  id: string
  Responsable: {
    responsible: string,
    photo: string
  } 
  Proyecto: string 
  Informe: string 
  Descripcion: string 
  Estatus: Glossary 
  Fecha: string 
  Importe: string
  Total: string
  condition: Glossary,
  archivos: string[],
  isPaid: boolean,
  folio: string,
  folioFiscal: string
  iva: number,
  discount: number
  typeCFDI: string,
  conceptCostoCenter: string,
  expiredDate: string
  daysExpired: number
  code: string,
  isCfdisRelations:boolean
}

export interface CostsPaymentTable {
  id: string
  Responsable: {
    responsible: string,
    photo: string
  } 
  Fecha: string 
  Importe: string
  Total: string,
  paid: number,
  pending: number,
  condition: Glossary,
  archivos: string[],
  isPaid: boolean,
  parciality: number
  folio: string,
  folioFiscal: string
  iva: number,
  discount: number
  typeCFDI: string,
  conceptCostoCenter: string
}

export interface ExpensesTableProvider {
  id: string
  Responsable: {
    responsible: string,
    photo: string
  } 
  reference: string
  range: string
  notes: string
  //Estatus: Glossary
  Estatus: boolean
  date: string
  Quantity: string
  paid: string
  pending: string
  archivos: boolean,
  paymentplugin: {
    plugin: number,
    date: string,
    notes: string
  }
  datePaid: string,
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
    darktext: boolean
  }
}

export interface DetailExpensesTableProvider {
  id: string
  Responsable: {
    responsible: string,
    photo: string
  }
  project: string,
  report: string
  description: string
  Estatus: Glossary
  paid: boolean
  date: string
  archivos: string[],
  // previoudbalanceamount: string,
  // payout: string,
  // partitialnumber: number,
  // unpaidbalanceamount: string
  previoudbalanceamount: number,
  payout: number,
  partitialnumber: number,
  unpaidbalanceamount: number,
  folio?: string
}

export interface ICostTOTALPendingPAYGroupByPROVIDER {
  quantity: number
  totalCost: number
  subtotalCost: number
  totalIVA: number
  totalDiscount: number
}

export interface IAdvanceProvider {
  _id: string
  folio: string
  taxfolio: string
  description: string
  date: string
  taxapply: boolean
  isticket: boolean
  ispaid: boolean
  iscard: boolean
  isadvancesToSuppliers: boolean
  cost: {
    subtotal: number
    iva: number
    total: number
    discount: any
    exempttax: any
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  project: {
    _id: string
    title: string
  }
  report: {
    _id: string
    name: string
  }
  provider: {
    _id: string
    name: string
  }
  costocenter: {
    _id: string
    category: string
    concept: {
      _id: string
      name: string
    }
  }
  typeCFDI: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
  }
  files: {
    file: string
    types: string
    _id: string
  }[]
  estatus: {
    _id: string
    name: string
    color: string
    darktext?:boolean
  }
  status: boolean
}

// export interface AdvancesTableProvider {
//   id: string
//   Responsable: {
//     responsible: string,
//     photo: string
//   } 
//   project:descripcion
//   condition: {
//     _id: string,
//     name: string,
//     color: string,
//     darktext: boolean
//   }
// }