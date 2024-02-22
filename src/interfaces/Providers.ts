export interface Provider {
  "_id":string,
  "name":string,
  "tradename"?: string,
  "rfc":string,
  "account":string,
  "email"?:string,
  "phone"?:string,
  "suppliercredit":boolean,
  "tradeline":{
    "creditdays"?:number,
    "creditlimit"?:number,
    "currentbalance"?:number,
    "overduedebt"?:boolean,
    "percentoverduedebt"?:number,
    "date"?:Date,
  },
  "contact"?:string[],
  "user"?:string,
  "status"?:boolean
}

export interface TableProvider{
  "id": string,
  "name":string,
  "suppliercredit": boolean,
  "rfc": string,
  "account"?:string,
  "currentbalance"?: number,
}