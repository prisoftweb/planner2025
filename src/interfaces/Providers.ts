import { Contact } from "./Common"
import { Glossary } from "./Glossary"

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
  "status"?:boolean
}

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
  condition: string,
  archivos: string[],
  isPaid: boolean
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
  total: string,
  importe: string
}