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

export interface RoleUser {
  _id: string
  name: string
  description: string
  tree: string
  status: boolean
  createAt: string
  __v: number
}

export interface Resource {
  _id: string
  name: string
  description: string
  title: string
  __v: number
  id: string
}

export interface ResourceTable {
  id: string,
  name: string,
  description: string,
  title: string
}

export interface Tree {
  _id: string
  resources: Resource2[]
  __v: number
  id: string
}

export interface Resource2 {
  permission: Permission
  resource: Resource3
  status: boolean
  routes: Route[]
  _id: string
  id: string
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

export interface Resource3 {
  _id: string
  name: string
  description: string
  title: string
  id: string
}

export interface Route {
  route: Route2
  status: boolean
  components: Component[]
  _id: string
  id: string
}

export interface Route2 {
  _id: string
  name: string
  description: string
  title?: string
  id: string
}

export interface Component {
  component: Component2
  status: boolean
  _id: string
  id: string
}

export interface Component2 {
  _id: string
  name: string
  description: string
  title?: string
  id: string
}

export interface TreeTable{
  id: string,
  status: boolean,
  resource: string,
  routes: string,
}