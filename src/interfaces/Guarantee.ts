export interface IGuarantee {
  cost: {
    subtotal: number
    iva: number
    total: number
    vat: string
  }
  _id: string
  user: string
  estimate: string
  project: string
  condition: {
    glossary: string
    user: string
    status: boolean
    _id: string
    id: string
  }[]
  date: string
  dateGuarantee: string
  datePayment: string
  status: boolean
  datets: string
  __v: number
  id: string
}

export interface ITableGuarantee {
  id: string
  proyect: string,
  client: string,
  dateGuarantee: string,
  datePayment: string,
  amount: number,
  amountVat: number,
  isValidate: boolean
}