export interface IWorkSpace {
  _id: string
  company: string
  tradename: string
  logo: string
  isologo: string
  isverificatedBankAccount: boolean
  isverificatedPhone: boolean
  isverificatedEmail: boolean
  bankAccountStatus: string
  cp: number
  validTo: string
  validFrom: string
  status: boolean
  datets: string
  __v: number
  id: string
}

export interface ITableWorkSpace {
  id: string
  company: string
  tradename: string
  logo: string
  isologo: string
  isverificatedBankAccount: boolean
  isverificatedPhone: boolean
  isverificatedEmail: boolean
  bankAccountStatus: string
  cp: number
  validTo: string
  validFrom: string
  status: boolean
}