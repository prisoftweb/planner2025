export interface User{
  'id': string,
  'photo': string,
  'name': string,
  'profile': {
    'status': boolean,
    'role': string, 
  },
  'email': string
}

export interface Usr{
  '_id': string,
  'photo': string,
  'name': string,
  'profile': {
    'status': boolean,
    'role': string, 
  },
  'email': string
}

export interface UsrBack{
  "_id": string,
  "name": string,
  "email": string,
  "photo": string,
  "role": string,
  "department": string,
  "status": boolean,
  "createAt"?: string,
  "__v"?: number,
  "passwordChangedAt"?: string
}

export interface UserBack {
  _id: string
  name: string
  email: string
  photo: string
  department: string
  rol: string
  status: boolean
  createAt: string
  __v: number
}
