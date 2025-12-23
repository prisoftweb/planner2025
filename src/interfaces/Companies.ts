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
  }
}