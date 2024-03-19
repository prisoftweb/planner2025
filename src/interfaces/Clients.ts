import { Options } from "./Common"
import { Contact } from "./Contacts"

export interface Client{
  name:string,
  tradename:string,
  rfc:string,
  //account: string,
  logo?: string,
  link?: string,
  client: string,
  email?:string,
  phone?: string,
  regime: string,
  source:string,
  sourceimg:string,
  haslocation:boolean,
  location: Location,
  tags?:string[],
  condition: Condition,
  contact:string[],
  user: string,
  status?: boolean,
}

export interface ClientBack{
  _id:string,
  name:string,
  tradename:string,
  rfc:string,
  account: string,
  logo?: string,
  link?: string,
  client: string,
  email?:string,
  phone?: string,
  regime: string,
  source:string,
  sourceimg:string,
  haslocation:boolean,
  location: Location,
  tags?:string[],
  condition: Condition,
  //contact:string[],
  contact:Contact[],
  user: string,
  status: boolean,
  "createAt"?: string,
  "__v"?: number,
}

export interface Location{
  type:string,
  coordinates:number[],
  stret:string,
  cp:number,
  community:string,
  municipy:string,
  state:string,
  country:string,
  address:string,
  description:string,
  addressref:string,
  homeref:string,
}

export interface Condition{
  type:string,
  date:Date,
  user?:string,
}

export interface TableClient{
  "id": string,
  "name":string,
  "status":boolean,
  'contacts': number,
  "rfc": string,
  "account":string,
  "currentbalance": number,
}

export interface Tag{
  "id": string,
  "name":string,
  '_id': string,
  '__v':string,
}

export const optionsPhone:Options[] = [
  {
    value: 'Movil',
    label: 'Movil'
  },
  {
    value: 'Escuela',
    label: 'Escuela'
  },
  {
    value: 'Casa',
    label: 'Casa'
  },
  {
    value: 'Trabajo',
    label: 'Trabajo'
  },
  {
    value: 'Otro',
    label: 'Otro'
  },
]

export const optionsSource:Options[] = [
  {
    value: 'landpage',
    label: 'landpage'
  },
  {
    value: 'facebook',
    label: 'facebook'
  },
  {
    value: 'instagram',
    label: 'instagram'
  },
  {
    value: 'whatsapp',
    label: 'whatsapp'
  },
  {
    value: 'llamada',
    label: 'llamada'
  },
  {
    value: 'recomendacion',
    label: 'recomendacion'
  },
  {
    value: 'sucursal',
    label: 'sucursal'
  },
  {
    value: 'otro',
    label: 'otro'
  },
]

export const optionsTags:Options[] = [
  {
    value: 'landpage',
    label: 'landpage'
  },
  {
    value: 'facebook',
    label: 'facebook'
  },
  {
    value: 'instagram',
    label: 'instagram'
  },
  {
    value: 'whatsapp',
    label: 'whatsapp'
  },
  {
    value: 'llamada',
    label: 'llamada'
  },
  {
    value: 'recomendacion',
    label: 'recomendacion'
  },
  {
    value: 'sucursal',
    label: 'sucursal'
  },
  {
    value: 'otro',
    label: 'otro'
  },
]