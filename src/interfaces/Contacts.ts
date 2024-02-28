export interface Contact{
  name:string,
  email:string,
  companyemail:string,
  phoneNumber?: Phone[]
}

export interface Phone{
  phone:string,
  type:string,
  phoneformat: string,
}