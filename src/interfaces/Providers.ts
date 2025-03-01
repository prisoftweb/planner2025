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
  }]
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

// export interface Tradeline {
//   creditdays: number
//   creditlimit: number
//   currentbalance: number
//   percentoverduedebt: number
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
    amount: number,
    date: string,
    notes: string
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
  unpaidbalanceamount: number
}