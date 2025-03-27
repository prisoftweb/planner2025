import {create} from 'zustand'
import { Options } from '@/interfaces/Common'

interface OptionsQuotationState {
  optClients: Options[],
  optConditions: Options[],
  optUsers: Options[],
  optVats: Options[],
  optCategories: Options[],
  optTypes: Options[]
}

const optionsExpenseInitial: OptionsQuotationState = {
  optConditions: [],
  optClients: [],
  optUsers: [],
  optVats: [],
  optCategories: [],
  optTypes: []
}

interface ActionsOptions {
  updateCategories: (cats: Options[]) => void,
  updateConditions: (conds: Options[]) => void,
  updateTypes: (typs: Options[]) => void,
  updateVats: (vas: Options[]) => void,
  updateClients: (clients: Options[]) => void,
  updateUsers: (users: Options[]) => void,
}

export const useOptionsQuotations = create<OptionsQuotationState & ActionsOptions >((set) => ({
  ...optionsExpenseInitial,
  updateCategories: (cats: Options[]) => set(state => ({
    ...state,
    categories: cats,
  })),
  updateConditions: (conds: Options[]) => set(state => ({
    ...state,
    conditions: conds,
  })),
  updateUsers: (users: Options[]) => set(state => ({
    ...state,
    optUsers: users,
  })),
  updateTypes: (typs: Options[]) => set(state => ({
    ...state,
    types: typs,
  })),
  updateVats: (vts: Options[]) => set(state => ({
    ...state,
    vats: vts,
  })),
  updateClients: (clients: Options[]) => set(state => ({
    ...state,
    optClients: clients,
  })),
}))