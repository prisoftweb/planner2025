import {create} from 'zustand'
import { UsrBack } from '@/interfaces/User'

//Se declaran interfaces para no escribir todo el codigo en la funcions
interface Actions {
  updateUser: (usr: UsrBack) => void,
  pushUser: (usr: UsrBack) => void,
  setUsers: (usrs: UsrBack[]) => void,
  deleteUser: (id: string) => void,
  reset: () => void,
}

// Se declara un valor inicial, como le pasamos el tipo UsrBack hay que llenar todos sus campos
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
  rol: undefined,
  profile: '',
}

interface ArrUsers {
  users: UsrBack[],
}

//este es el estado inicial para multiples usuarios
const initialUsers: ArrUsers = {
  users: [],
};

//aqui se agregan los valores iniciales y se declaran las funcionalidades de los metodos
//que es puro set pero es ir  asignando los valores de cada uno
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