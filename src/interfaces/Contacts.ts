export interface Contact{
  name:string,
  email:string,
  companyemail:string,
  phoneNumber?: Phone[],
  _id?: string,
  user?: string,
  status?: boolean,
  createAt?: string,
  __v?: number
}

export interface Phone{
  phone:string,
  type:string,
  phoneformat: string,
  _id?: string,
}