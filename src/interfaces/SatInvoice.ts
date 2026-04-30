export interface ISatCompany {
  _id: string
  email: string
  issuer: {
    legalName: string
    tin: string
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