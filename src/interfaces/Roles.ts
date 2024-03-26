export interface Role {
  _id: string
  name: string
  description: string
  accessresource: Accessresource[]
  status: boolean
  createAt: string
  __v: number
  accessroute: any[]
}

export interface Accessresource {
  permission: Permission
  _id: string
}

export interface Permission {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  search: boolean
  export: boolean
  print: boolean
  select: boolean
  filter: boolean
  searchfull: boolean
  readfull: boolean
}

export interface RoleTable {
  id: string,
  name: string,
  status: {
    status: boolean,
    routes: number,
  },
  users: number,
  components: number,
  description: string,
}

export interface NewRole {
  name: string,
  description: string,
}

export interface Resource {
  _id: string
  name: string
  description: string
  __v: number
  id: string
}

export interface ResourceTable {
  id: string,
  name: string,
  status: boolean,
  description: string,
}

export interface Route {
  _id: string
  name: string
  description: string
  __v: number
  id: string
}

// export interface RouteTable {
//   id: string,
//   name: string,
//   status: boolean,
//   description: string,
// }

// export interface Component {
//   _id: string
//   name: string
//   description: string
//   __v: number
//   id: string
// }
