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
  status: boolean
  __v: number
  id: string
}