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
  estimate: string,
  amount: number,
  id: string
}