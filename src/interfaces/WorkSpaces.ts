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

export interface IWorkSpaceMin {
  _id: string
  name: string
  surname: string
  email: string
  phoneNumber: string
  picture: string
  isverificatedBankAccount: boolean
  isverificatedPhone: boolean
  isverificatedEmail: boolean
  validTo: string
  validFrom: string
  estatus: {
    _id: string
    name: string
    color: string
    darktext: boolean
  }
  daysavailable?: number
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

export interface ITableCompanyWorkSpace {
  logo:string
  name:string
  rfc:string
  status:boolean
  date:string
  fisica:boolean
  id:string
}

export interface ICompanyWorkSpace {
  location: {
    type: string
    coordinates: any[]
  }
  isologo: string
  isverificatedSAT: boolean
  _id: string
  name: string
  tradename?:string
  email: string
  phoneNumber: string
  address: string
  logo: string
  status: boolean
  __v: number
  type: {
    _id: string
    name: string
  }
  id: string
}

export interface ICompanyInWorkSpace{
  _id:string
  companys:ICompanyWorkSpace
}

export interface ICompanyProfileInWorkSpace{
  _id: string
  name: string
  tradename: string
  email: string
  isologo: string
}
