import {create} from 'zustand'

interface TablesStates {
  search: string,
}

interface Actions {
  updateSearch: (value: string) => void
}

const initialStates: TablesStates = {
  search: '',
}

export const useTableStates = create<TablesStates & Actions>((set) => ({
  ...initialStates,
  updateSearch: (value: string) => set(state => ({
    ...state,
    search: value,
  }))
}))