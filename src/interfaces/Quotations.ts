export interface IQuotationMin {
  _id: string
  title: string
  description: string
  shippingdate: string
  amountotal: number
  condition: {
    _id: string
    name: string
    color: string
  }[]
  client: {
    _id: string
    name: string
  }
  user: {
    name: string
    photo: string
  }
  account: string
}

export interface IQuotationTable {
  id: string
  Detalle: {
    name: string
    photo: string
  }
  Folio: string 
  Titulo: string 
  Cliente: {
    _id: string
    name: string
  }
  Estatus: {
    _id: string
    name: string
    color: string
  }
  Fechasol: string 
  Fechaenv: string 
  Monto: number
}

export interface IOneQuotationMin {
  _id: string
  title: string
  description: string
  shippingdate: string
  amountotal: number
  condition: {
    _id: string
    name: string
    color: string
  }[]
  client: {
    _id: string
    name: string
  }
  user: {
    name: string
    photo: string
  }
  account: string
}
