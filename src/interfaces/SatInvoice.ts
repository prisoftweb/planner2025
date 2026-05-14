export interface ISatCompany {
  _id: string
  email: string
  issuer: {
    legalName: string
    tin: string
    taxRegimeCode: string
    expeditionZipCode: number
    password: string
    taxCredentials: {
      base64File: string
      fileType: number
      password: string
    }[]
  }
}

export interface ISatConcept {
  conceptEstimate: {
    _id: string
      unit: {
      _id: string
      name: string
      color: string
    }
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
    code: string
    name: string
    description: string
    unitsat: {
      id: string
      unit: string
      real: string
    }
    codesat: number
    descriptionsat: string
    datets: string
    prices: {
      cost: number
      date: string
      user: string
      status: boolean
      _id: string
    }[]
    status: boolean
  }
  priceConcepEstimate: {
    cost: number
    date: string
    user: string
  }
  quantity: number
  amount: number
  date: string
  user: string
}

export interface IResponseSatInvoice {
  versionCode: string
  series: string
  number: string
  date: string
  paymentFormCode: string
  paymentConditions: any
  subtotal: number
  discount: number
  currencyCode: string
  exchangeRate: number
  total: number
  typeCode: string
  exportCode: string
  uuid: string
  consecutive: number
  status: any
  paymentMethodCode: string
  expeditionZipCode: string
  issuer: {
    id: any
    tin: string
    legalName: string
    taxRegimeCode: string
  }
  recipient: {
    id: any
    tin: string
    legalName: string
    zipCode: string
    taxRegimeCode: string
    cfdiUseCode: string
    email: string
  }
  items: {
    itemCode: string
    quantity: number
    unitOfMeasurementCode: string
    description: string
    unitPrice: number
    taxObjectCode: string
    itemSku: string
    unitOfMeasurement: any
    discount: number
    itemTaxes: {
      taxCode: string
      taxTypeCode: string
      taxRate: number
      taxFlagCode: string
    }[]
  }[]
  responses: {
    invoiceId: string
    invoiceUuid: string
    invoiceCertificateNumber: string
    invoiceBase64Sello: string
    invoiceBase64QrCode: string
    invoiceBase64: string
    satBase64Sello: string
    satBase64OriginalString: string
    invoiceSignatureDate: string
    satCertificateNumber: string
    id: string
    createdAt: string
    updatedAt: string
  }[]
  id: string
  createdAt: string
  updatedAt: string
}

export interface ISatCatalog {
  id: string
  description: string
  createdAt: string
  updatedAt: any
}
