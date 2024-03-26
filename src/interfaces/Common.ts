export interface Contact{
  name:string,
  email:string,
  companyemail:string,
  phoneNumber: PhoneNumber[],
  user:string
}

export interface PhoneNumber{
  type: string,
  phone:string,
  phoneformat:string
}

export interface Options{
  value: string,
  label: string,
}