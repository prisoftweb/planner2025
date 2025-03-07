export interface IQuotationMin {
  _id: string
  title: string
  description: string
  applicationdate: string
  expirationdate: string
  cost: {
    subtotal: number
    iva: number
    total: number
  }
  score: number
  condition: {
    _id: string
    name: string
    color: string
  }[]
  client: {
    _id: string
    name: string
  }
  applicant: {
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

// export interface IOneQuotationMin {
//   _id: string
//   title: string
//   description: string
//   shippingdate: string
//   amountotal: number
//   condition: {
//     _id: string
//     name: string
//     color: string
//   }[]
//   client: {
//     _id: string
//     name: string
//   },
//   applicant: {
//     _id: string
//     name: string
//   }
//   user: {
//     name: string
//     photo: string
//   }
//   account: string
//   score: number
// }

export interface IOneQuotationMin {
  _id: string
  title: string
  description: string
  applicationdate: string
  expirationdate: string
  cost: {
    subtotal: number
    iva: number
    total: number
  }
  score: number
  condition: {
    _id: string
    name: string
    color: string
  }[]
  client: {
    _id: string
    name: string
  }
  applicant: {
    _id: string
    name: string
  }
  user: {
    name: string
    photo: string
  }
  account: string
}

export interface IContactsClient {
  contact: {
    _id: string
    name: string
    phoneNumber: {
      type: string
      phone: string
      phoneformat: string
      _id: string
    }[]
  }[]
}
