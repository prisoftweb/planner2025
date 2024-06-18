import { Role } from "./Roles"
import { Department } from "./Departments"

export interface User{
  'id': string,
  'photo': string,
  'name': string,
  'profile': {
    'status': boolean,
    'role': string, 
  },
  'email': string,
  'role': string,
  'department': string
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
  "department": (string | Department),
  "status": boolean,
  "createAt"?: string,
  "__v"?: number,
  "passwordChangedAt"?: string,
  "rol"? : Role
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
