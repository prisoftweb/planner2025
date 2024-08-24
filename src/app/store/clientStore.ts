import {create} from 'zustand'
import { TableClient } from '@/interfaces/Clients'
import { Condition, Location } from '@/interfaces/Clients'
import { ClientBack } from '@/interfaces/Clients'

interface Actions {
  updateClient: (cli: TableClient) => void,
  pushClient: (cli: TableClient) => void,
  setClients: (clis: TableClient[]) => void,
  deleteClient: (id: string) => void,
  reset: () => void,
}

const c : Condition = {
  date: new Date(),
  type: '',
  user: undefined,
}

const location: Location = {
  address: '',
  addressref: '',
  community: '',
  coordinates: [],
  country: '',
  cp: 0,
  description: '',
  homeref: '',
  municipy: '',
  state: '',
  stret: '',
  type: ''
}

const initialState: TableClient = {
  //_id: '',
  account: '',
  //client: '',
  //condition: c,
  //contact: [],
  //haslocation: false,
  name: '',
  //regime: '',
  rfc: '',
  //source: '',
  //sourceimg: '',
  status: false, 
  //location: location,
  //tradename: '',
  //user: '',
  //__v: undefined,
  //createAt: undefined,
  //email: undefined,
  //link: undefined,
  //logo: undefined,
  //phone: undefined,
  //tags: undefined
  contacts: 0,
  currentbalance: 0,
  id: '',
  logo: ''
}

interface ArrClients {
  clients: TableClient[],
}

const initialClients: ArrClients = {
  clients: [],
};

export const useClientStore = create<TableClient & Actions & ArrClients>((set) => ({
  ...initialState,
  ...initialClients,
  updateClient: (value:TableClient) => set(state => ({
    ...state,
  })),
  setClients: (value: TableClient[]) => set(state => ({
    ...state,
    clients: value,
  })),
  pushClient: (value:TableClient) => set(state => ({
    clients: [...state.clients, value],
  })),
  deleteClient: (value:string) => set(state => ({
    ...state,
    clients: state.clients.filter(cli => cli.id!==value),
  })),
  reset: () => {
    set(initialState)
  },
}))

interface ActionsClient {
  updateProfileClient: (cli: ClientBack) => void,
  reset: () => void,
}

interface clientProfile {
  clientProfile: ClientBack | undefined
}

const initialClientProfile: clientProfile = {
  clientProfile: undefined
}

export const useClientProfileStore = create<ActionsClient & clientProfile>((set) => ({
  ...initialClientProfile,
  updateProfileClient: (value:ClientBack) => set(state => ({
    ...state,
    clientProfile: value,
  })),
  reset: () => {
    set(initialClientProfile)
  },
}))