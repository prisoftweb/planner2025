export interface CompanyTable{
  "id": string,
  "name":string,
  "status":boolean,
  "phoneNumber": string,
  "email": string,
  "address": string,
  "logo": string,
}

export interface Company {
  _id: string
  name: string
  email: string
  phoneNumber: string
  address: string
  logo: string
  isologo?: string
  status: boolean
  __v: number
  id: string
  tradename?:string
  contact?:string,
  location?: {
    stret?: string,
    cp?: string,
    community?: string,
    municipy?: string,
    state?: string,
    country?: string,
    addressref?: string
  },
  rfc?:string,
  taxregime?:string,
  capitalregime:string
  password?:string
  tax: {
    taxregime: string
    name: string
    rfc: string
    capitalregime: string
    cp: number
    files: {
      file: string
      _id: string
      id: string
    }[]
  }
}
