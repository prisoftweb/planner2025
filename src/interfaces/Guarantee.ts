import { Glossary } from "./Glossary"

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

export interface IGuaranteeMin {
  _id: string
  cost: {
    subtotal: number
    iva: number
    total: number
    vat: string
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  estimate: {}
  project: {
    _id: string
    title: string
    photo: string
  }
  date: string
  dateGuarantee: string
  datePayment: string
  estatus: {
    _id: string
    name: string
    color: string
  }
  client: {
    _id: string
    name: string
  }
}

export interface IAmountTotalGuaranteesByDateAndStatus {
  quantity: number
  subtotal: number
  total: number
  status: string
}

export interface IGuaranteeGroupByClient {
  quantity: number
  subtotal: number
  total: number
  client: string
}

// export interface IGuaranteByYear {
//   quantity: number
//   subtotal: number
//   total: number
//   year: number
// }

export interface IGuaranteByYear {
  year: number
  quantity: number
  subtotal: number
  total: number
  porcentage: number
  quantityRecovered: number
  subtotalRecovered: number
  totalRecovered: number
}

export interface IGuaranteeByStatus {
  quantity: number
  subtotal: number
  total: number
  status: string
}

export interface IGuaranteeByPojectMin {
  _id: string
  cost: {
    subtotal: number
    iva: number
    total: number
    vat: string
  }
  user: {
    _id: string
    name: string
    photo: string
  }
  estimate: {
    _id: string
    name: string
  }
  project: {
    _id: string
    title: string
    photo: string
  }
  date: string
  dateGuarantee?: string
  datePayment?: string
  dateProgramming?: string
  estatus: {
    _id: string
    name: string
    color: string
  }
  client: {
    _id: string
    name: string
  }
}


export interface ITableGuaranteeByProject {
  id: string
  client: string,
  // dateGuarantee: string,
  // datePayment: string,
  date: string,
  amount: number,
  amountVat: number,
  // isValidate: boolean
  estimate: string,
  user:string,
  status: {
    _id: string
    name: string
    color: string
  }
  fechaRetencion: string,
  fechaGarantia: string,
  fechaProgramacion: string,
  fechaPago: string
}

export interface IGuaranteeResumenByProject {
  quantity: number
  subtotal: number
  iva: number
  total: number
  project: string
  client: string
}

export interface ITotalGuaranteefundsByStatus {
  recovered: {
    quantityRecovered: number
    subtotalRecovered: number
    totalRecovered: number
  }
  guarantee: {
    quantity: number
    subtotal: number
    total: number
  }
  porcentage: number
}
