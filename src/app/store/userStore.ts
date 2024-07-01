import {create} from 'zustand'
import { UsrBack } from '@/interfaces/User'

// interface NewExpenseState {
//   costCenter: string,
//   folio:string, 
//   taxFolio:string,
//   description:string,
//   amount: string, 
//   date:string, 
//   vat:string, 
//   discount:string, 
//   typeExpense: string
//   typeCFDI: string
//   proveedor: string
//   responsible: string
//   category:string
//   idVat: string
//   type: string
  
//   voucher: (File | null),
//   CFDI: (File | null)

//   refresh: boolean
// }

// interface PettyCashState{
//   isPettyCash: boolean,
//   isCard: boolean
// }

// interface ProjectState{
//   project: string,
//   indexStepper: number,
//   report: string,
//   condition: string,
//   isDeductible: boolean
// }

interface Actions {
  updateUser: (usr: UsrBack) => void,
  pushUser: (usr: UsrBack) => void,
  setUsers: (usrs: UsrBack[]) => void,
  deleteUser: (id: string) => void,
  reset: () => void,
}

const initialState: UsrBack = {
  _id: '',
  department: '',
  email: '',
  name: '',
  photo: '',
  role: '',
  status: true,
  __v: 0,
  createAt: '',
  passwordChangedAt: '',
  rol: undefined
}

interface ArrUsers {
  users: UsrBack[],
}

const initialUsers: ArrUsers = {
  users: [],
};

export const useUserStore = create<UsrBack & Actions & ArrUsers>((set) => ({
  ...initialState,
  ...initialUsers,
  updateUser: (value:UsrBack) => set(state => ({
    ...state,
    __v: value.__v,
    _id: value._id,
    createAt: value.createAt,
    department: value.department,
    email: value.email,
    name: value.name,
    passwordChangedAt: value.passwordChangedAt,
    photo: value.photo,
    rol: value.rol,
    status: value.status,
  })),
  setUsers: (value: UsrBack[]) => set(state => ({
    ...state,
    users: value,
  })),
  pushUser: (value:UsrBack) => set(state => ({
    users: [...state.users, value],
  })),
  deleteUser: (value:string) => set(state => ({
    ...state,
    users: state.users.filter(usr => usr._id!==value),
  })),
  reset: () => {
    set(initialState)
  },
}))